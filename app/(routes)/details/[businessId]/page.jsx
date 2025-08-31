"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect } from "react";

function BusinessDetail({ params }) {
  const { data, status } = useSession();

  useEffect(() => {
    params && getbusinessById();
  }, [params]);

  useEffect(() => {
    checkUserAuth();
  }, []);
  const getbusinessById = () => {
    GlobalApi.getBusinessById(params.businessId).then((resp) => {
      console.log(resp);
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

  return status == "authenticated" && <div>BusinessDetail</div>;
}

export default BusinessDetail;

