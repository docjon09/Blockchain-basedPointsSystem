import Link from "next/link";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";
import { useAccount } from "wagmi";
import {
  useAnimationConfig,
  useScaffoldContract,
  useScaffoldContractRead,
  useScaffoldEventHistory,
  useScaffoldEventSubscriber,
} from "~~/hooks/scaffold-eth";

function timestampToString(t: number) {
  let d = new Date(t * 1000);
  let s = d.toLocaleString();
  return s;
}

const History: NextPage = () => {
  const { address } = useAccount();

  const { data: isSeller } = useScaffoldContractRead({
    contractName: "LoyaltyProgram",
    functionName: "isSeller",
    args: [address],
  });

  const {
    data: pointEarnedEvents,
    isLoading: isLoadingEvents,
    error: errorReadingEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "PointsEarned",
    fromBlock: 0n,
    filters: { customer: address },
    transactionData: true,
  });

  const {
    data: rewardRedeemedEvents,
    isLoading: isLoadingRedeemedEvents,
    error: errorReadingRedeemedEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "RewardRedeemed",
    fromBlock: 0n,
    filters: { customer: address },
    transactionData: true,
  });

  const {
    data: sellerRewardRedeemedEvents,
    isLoading: isLoadingSellerRedeemedEvents,
    error: errorReadingSellerRedeemedEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "SellerRewardRedeemed",
    fromBlock: 0n,
    filters: { customer: address },
    transactionData: true,
  });

  const {
    data: pointsGrantedEvents,
    isLoading: isLoadingPointsGrantedEvents,
    error: errorReadingPointsGrantedEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "PointsGranted",
    fromBlock: 0n,
    filters: { seller: address },
    transactionData: true,
  });

  const {
    data: pointsReturnedEvents,
    isLoading: isLoadingPointsReturnedEvents,
    error: errorReadingPointsReturnedEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "PointsReturned",
    fromBlock: 0n,
    filters: { seller: address },
    transactionData: true,
  });
  
  const {
    data: sellerRewardReceivedEvents,
    isLoading: isLoadingSellerReceivedEvents,
    error: errorReadingSellerReceivedEvents,
  } = useScaffoldEventHistory({
    contractName: "LoyaltyProgram",
    eventName: "SellerRewardRedeemed",
    fromBlock: 0n,
    filters: { seller: address },
    transactionData: true,
  });

  return (
    <>
      <MetaHeader title="History"/>
      <div className="px-8 pt-20 w-full">
        {isSeller ? (<>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Points grant received(Only sellers)
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingPointsGrantedEvents || pointsGrantedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (pointsGrantedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Points granted</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        pointsGrantedEvents.map(pointsGrantedEvent =>
                          <tr key={pointsGrantedEvent.transaction.hash}>
                            <td>{timestampToString(Number(pointsGrantedEvent.block.timestamp))}</td>
                            <td>{pointsGrantedEvent.transaction.hash}</td>
                            <td>{Number(pointsGrantedEvent.args.pointsGranted)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Points Returned(Only sellers)
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingPointsReturnedEvents || pointsReturnedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (pointsReturnedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Points Returned</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        pointsReturnedEvents.map(pointsReturnedEvent =>
                          <tr key={pointsReturnedEvent.transaction.hash}>
                            <td>{timestampToString(Number(pointsReturnedEvent.block.timestamp))}</td>
                            <td>{pointsReturnedEvent.transaction.hash}</td>
                            <td>{Number(pointsReturnedEvent.args.pointsReturned)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Points received from customers in exchange of rewards
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingSellerReceivedEvents || sellerRewardReceivedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (sellerRewardReceivedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Customer address</th>
                        <th>Points received</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        sellerRewardReceivedEvents.map(sellerRewardReceivedEvent =>
                          <tr key={sellerRewardReceivedEvent.transaction.hash}>
                            <td>{timestampToString(Number(sellerRewardReceivedEvent.block.timestamp))}</td>
                            <td>{sellerRewardReceivedEvent.transaction.hash}</td>
                            <td>{sellerRewardReceivedEvent.args.customer}</td>
                            <td>{Number(sellerRewardReceivedEvent.args.pointsRedeemed)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>
        </>
        ) : (<>
          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Points earned
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingEvents || pointEarnedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (pointEarnedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Points earned</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        pointEarnedEvents.map(earnEvent =>
                          <tr key={earnEvent.transaction.hash}>
                            <td>{timestampToString(Number(earnEvent.block.timestamp))}</td>
                            <td>{earnEvent.transaction.hash}</td>
                            <td>{Number(earnEvent.args.pointsEarned)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Reward redeemed
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingRedeemedEvents || rewardRedeemedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (rewardRedeemedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Reward redeemed</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        rewardRedeemedEvents.map(rewardRedeemedEvent =>
                          <tr key={rewardRedeemedEvent.transaction.hash}>
                            <td>{timestampToString(Number(rewardRedeemedEvent.block.timestamp))}</td>
                            <td>{rewardRedeemedEvent.transaction.hash}</td>
                            <td>{Number(rewardRedeemedEvent.args.pointsRedeemed)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>

          <div tabIndex={0} className="collapse collapse-arrow border border-base-300 bg-base-200">
            <div className="collapse-title text-base font-medium">
              Seller rewards redeemed
            </div>
            <div className="overflow-auto collapse-content">
              {(isLoadingSellerRedeemedEvents || sellerRewardRedeemedEvents === undefined) ? (
                <span>loading...</span>
              ) : (
                (sellerRewardRedeemedEvents?.length > 0) ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Transaction hash</th>
                        <th>Seller</th>
                        <th>Reward redeemed</th>
                      </tr>
                    </thead>
                    {<tbody>
                      {
                        sellerRewardRedeemedEvents.map(sellerRewardRedeemedEvent =>
                          <tr key={sellerRewardRedeemedEvent.transaction.hash}>
                            <td>{timestampToString(Number(sellerRewardRedeemedEvent.block.timestamp))}</td>
                            <td>{sellerRewardRedeemedEvent.transaction.hash}</td>
                            <td>{sellerRewardRedeemedEvent.args.seller}</td>
                            <td>{Number(sellerRewardRedeemedEvent.args.pointsRedeemed)}</td>
                          </tr>
                        )
                      }
                    </tbody>}
                  </table>
                ) : (
                  <span>No such transaction so far</span>
                )
              )}
            </div>
          </div>
        </>
        )

        }



      </div>
    </>
  );
};

export default History;
