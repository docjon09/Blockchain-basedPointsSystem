// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract LoyaltyProgram is Ownable{
    mapping(address => uint256) private _balances;
    uint256 private _totalSupply;
    uint256 private _exchangeRate;
    mapping(address => bool) private _isSeller;

    uint256 private _decayStartTime;
    uint256 private _decayTimeInterval;
    uint16 private _decayRate;
    mapping(address => uint256) private _lastDecayTime;

    error ERC20InsufficientBalance(address sender, uint256 balance, uint256 needed);
    error ERC20InvalidSender(address sender);
    error ERC20InvalidReceiver(address receiver);
    error WrongAddress(address user);

    event Transfer(address indexed from, address indexed to, uint256 value);
    event PointsGranted(address indexed seller, uint256 pointsGranted);
    event PointsEarned(address indexed customer, uint256 pointsEarned);
    event RewardRedeemed(address indexed customer, uint256 pointsRedeemed);
    event SellerRewardRedeemed(address indexed customer, address indexed seller, uint256 pointsRedeemed);
    event PointsReturned(address indexed seller, uint256 pointsReturned);
    event SellerPointsEarned(address indexed seller, address indexed customer, uint256 pointsEarned);

    constructor(uint256 exchange_rate) {
        _exchangeRate = exchange_rate;
    }

    function addSeller(address seller) external onlyOwner{
        _isSeller[seller] = true;
    }

    function isSeller(address user) public view returns (bool) {
        return _isSeller[user];
    }

    function exchangeRate() public view returns (uint256) {
        return _exchangeRate;
    }

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function getBalance() public view returns (uint256) {
        return _balances[msg.sender];
    }

    //Function for owner to grant points to sellers
    function grantPoints(address seller, uint256 amount) external onlyOwner{
        require(amount > 0, "Amount must be greater than zero");
        require(isSeller(seller), "Only sellers can be granted points through this function");
        
        _mint(seller, amount);
        
        emit PointsGranted(seller, amount);
    }

    // Function for owner to reward points to customers
    function rewardPoints(address customer, uint256 amount) external onlyOwner{
        require(amount > 0, "Amount must be greater than zero");
        require(!isSeller(customer), "Sellers cannot be awarded points");

        _mint(customer, amount);
        
        emit PointsEarned(customer, amount);
    }
    
    // Function for customers to redeem rewards
    function redeemReward(uint256 pointsToRedeem) external {
        require(pointsToRedeem > 0, "Points to redeem must be greater than zero");
        require(_balanceOf(msg.sender) >= pointsToRedeem, "Insufficient points");
        require(!isSeller(msg.sender), "Sellers are not allowed");
        
        // Burn tokens from sender's balance
        _burn(msg.sender, pointsToRedeem);
        
        emit RewardRedeemed(msg.sender, pointsToRedeem);
    }

    //Function for customers to redeem rewards for rewards offered by sellers
    function redeemSellerReward(address seller, uint256 pointsToRedeem) external {
        require(pointsToRedeem > 0, "Points to redeem must be greater than zero");
        require(_balanceOf(msg.sender) >= pointsToRedeem, "Insufficient points");
        require(!isSeller(msg.sender), "Sellers are not allowed to redeem other seller's rewards");
        require(isSeller(seller), "The address given is not a seller");
        
        // Burn tokens from sender's balance
        _transfer(msg.sender, seller, pointsToRedeem);
        
        emit SellerRewardRedeemed(msg.sender, seller, pointsToRedeem);
    }

    //Function for seller to award points to customers
    function sellerRewardPoints(address customer, uint256 amount) external {
        require(isSeller(msg.sender), "Only sellers can call this function");
        require(amount > 0, "Amount must be greater than zero");
        require(!isSeller(customer), "Sellers cannot be awarded points");

        
        _transfer(msg.sender, customer, amount);
        
        emit SellerPointsEarned(msg.sender, customer, amount);
    }

    //Function for sellers to return points in exchange of cash
    function returnPoints(uint256 pointsToReturn) external {
        require(pointsToReturn > 0, "Points to return must be greater than zero");
        require(_balanceOf(msg.sender) >= pointsToReturn, "Insufficient points");
        require(isSeller(msg.sender), 'Only sellers can return points in exchange of cash');

        // Burn tokens from sender's balance
        _burn(msg.sender, pointsToReturn);
        
        emit PointsReturned(msg.sender, pointsToReturn);
    }

    //Function to making points decay at regular intervals of time
    function decayTokens(address user) internal {
        //If it is a new account, set its lastDecayTime to the decay time just before the current time. 
        if(_lastDecayTime[user] == 0){
            _lastDecayTime[user] = ((block.timestamp - _decayStartTime)/_decayTimeInterval)*_decayTimeInterval + block.timestamp;
            return; 
        }
        else{
            while((block.timestamp - _lastDecayTime[user]) >= _decayTimeInterval && _balanceOf(user) > 0){
                uint256 _decay = (_balanceOf(user) * _decayRate) / 100;
                if(_decay > _balanceOf(user)) _decay = _balanceOf(user);
                _burn(user, _decay);
                _lastDecayTime[user] += _decayTimeInterval;
            }
        }
    }

    function _transfer(address from, address to, uint256 value) internal {
        if (from == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        if (to == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(from, to, value);
    }

    function _update(address from, address to, uint256 value) internal virtual {
        if (from == address(0)) {
            // Overflow check required: The rest of the code assumes that totalSupply never overflows
            _totalSupply += value;
        } else {
            uint256 fromBalance = _balances[from];
            if (fromBalance < value) {
                revert ERC20InsufficientBalance(from, fromBalance, value);
            }
            unchecked {
                // Overflow not possible: value <= fromBalance <= totalSupply.
                _balances[from] = fromBalance - value;
            }
        }

        if (to == address(0)) {
            unchecked {
                // Overflow not possible: value <= totalSupply or value <= fromBalance <= totalSupply.
                _totalSupply -= value;
            }
        } else {
            unchecked {
                // Overflow not possible: balance + value is at most totalSupply, which we know fits into a uint256.
                _balances[to] += value;
            }
        }

        emit Transfer(from, to, value);
    }

    function _mint(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidReceiver(address(0));
        }
        _update(address(0), account, value);
    }

    function _burn(address account, uint256 value) internal {
        if (account == address(0)) {
            revert ERC20InvalidSender(address(0));
        }
        _update(account, address(0), value);
    }

    function _balanceOf(address account) internal view virtual returns (uint256) {
        return _balances[account];
    }
}