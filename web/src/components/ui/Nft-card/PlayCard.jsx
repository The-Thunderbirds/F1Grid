import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'
import { AdminAccountAddress } from "@/constants";

const PlayCard = (props) => {
  const router = useRouter();

  const { title, id, currentBid, creatorImg, imgUrl, creator, minted } = props.item;

  return (
    <div className="single__nft__card"
      onClick={() => {
        router.push({
          pathname: '/play/[playId]',
          query: { playId: id },
        })
      }}>
      <div className="nft__img">
        <Image src={imgUrl} fill alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title"

        >
          {title}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">
            <Image src={creatorImg} alt="" width="40" />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Owner</h6>
              <p>{AdminAccountAddress}</p>
            </div>

            {minted && 
            <div>
              <h6>Total Mints: </h6>
              <p style={{textAlign:"center"}}>{minted}</p>
            </div>
            }
          </div>
        </div>

        {!props.nopurchase && (
          <div className=" mt-3 d-flex align-items-center justify-content-between">
            <button
              className="bid__btn d-flex align-items-center gap-1"
            // onClick={() => setShowModal(true)}
            >
              <i className="ri-shopping-bag-line"></i> Purchase
            </button>

            {/* {showModal && <Modal setShowModal={setShowModal} />} */}

            <span className="history__link">
              <Link href="#">View History</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayCard;
