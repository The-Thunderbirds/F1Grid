import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'

import Modal from "../Modal/Modal";

const NftCard = (props) => {
  const router = useRouter();

  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="single__nft__card"               onClick={() => {
      router.push({
        pathname: '/token/[tokenId]',
        query: { tokenId: id },
      }) 
    }}>
      <div className="nft__img">
        <Image src={imgUrl} alt=""  className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title" 

        >
          {title}
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">
          <div className="creator__img">  
            <Image src={creatorImg} alt="" width="40"  />
          </div>

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Price</h6>
              <p>{currentBid} ETH</p>
            </div>
          </div>
        </div>

{!props.nopurchase && (
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={() => setShowModal(true)}
          >
            <i className="ri-shopping-bag-line"></i> Purchase
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            <Link href="#">View History</Link>
          </span>
        </div>
)}
      </div>
    </div>
  );
};

export default NftCard;
