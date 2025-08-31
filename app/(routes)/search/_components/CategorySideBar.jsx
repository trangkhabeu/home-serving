"use client";
import GlobalApi from "@/app/_services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const params = usePathname();
  params.split("/")[2];

  useEffect(() => {
    console.log(params);
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  // used to get all category list
  const getCategoryList = () => {
    GlobalApi.getCategory().then((resp) => {
      console.log(resp);
      setCategoryList(resp.categories);
    });
  };
  return (
    <div>
      <h2 className="font-bold mb-3 text-lg text-[#5233DD]">Category</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`flex gap-2 p-3 border rounded-lg 
            mb-3 md:mr-19 cursor-pointer
            hover:bg-purple-50 hover:text-[#5233DD] 
            hover:border-[#5233DD]
            hover:shadow-md items-center
            ${
              selectedCategory == category.name &&
              "border-[#5233DD] text-[#5233DD] shadow-md bg-purple-50"
            } `}
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;

