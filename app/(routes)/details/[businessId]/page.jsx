"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";

function BusinessDetail({ params }) {
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    params && getbusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);
  const getbusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      setBusiness(resp.businessList);
    });
  };
  //2:27:25
  const checkUserAuth = () => {
    if (status == "loading") {
      return <p>Loading...</p>;
    }
    if (status == "unauthenticated") {
      signIn("descope");
    }
  };

  return (
    status == "authenticated" &&
    business && (
      <div className="py-8 sm:py-20 px-10 md:px-36 ">
        <BusinessInfo business={business} />
        <div className="grid grid-cols-3 mt-15">
          <div className="col-span-4 md:col-span-2 order-last md:order-first">
            <BusinessDescription business={business} />
          </div>
          <div className="">
            <SuggestedBusinessList business={business} />
          </div>
        </div>
      </div>
    )
  );
}

export default BusinessDetail;

