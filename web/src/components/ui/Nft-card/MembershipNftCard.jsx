import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image"
import { useRouter } from 'next/router'
import img from "../../../assets/images/gold.png"
import { useFlowUser } from "@/hooks/userFlowUser"
import { _addUserToWaitlist } from "@/fcl/transactions"
import { Spinner } from "reactstrap";
import {AdminAccountAddress} from "@/constants"
const MembershipNftCard = (props) => {
  const router = useRouter();

  const flowUser = useFlowUser()

  const { title, id, desc, creatorImg, imgUrl, creator } = props.item;

  const [loading, setLoading] = useState(false);

  const handleJoinWaitList = async () => {
    setLoading(true)
    const result = await _addUserToWaitlist(id, flowUser?.addr)
    if (result) {
      alert("You have joined waitlist successfully")
      setLoading(false)
      window.location.reload();
    }
    else {
      alert("Something went wrong")
      setLoading(false)

    }
  }

  return (
    <div className="single__nft__card"               >
      <div className="nft__img">
        <Image src={img} fill alt=""  className="w-100" />
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
              <h6>Creator</h6>
              <p>{AdminAccountAddress}</p>
            </div>

          </div>
        </div>

        {!props.nopurchase && (
        <div className=" mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            onClick={handleJoinWaitList}
          >
            {!loading && <span> <i className="ri-shopping-bag-line"></i> Join Waitlist </span>}
            <Spinner color="primary" style={{ display: loading ? "block" : "none" }} />            
          </button>

          {/* {showModal && <Modal setShowModal={setShowModal} />} */}
          <span className="history__link">
            <Link href="#">20 Days Left</Link>
          </span>
          <span className="history__link">
            <Link href="#">In Stock: 10 </Link>
          </span>
        </div>
)}
      </div>
    </div>
  );
};

export default MembershipNftCard;
