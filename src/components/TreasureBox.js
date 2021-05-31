import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const TreasureBox = (props) => {
  const listingData = {
    type: "prizes",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      {
        name: "Cost",
        dataQuery: "kudosCost",
      },
      {
        name: "Qty",
        dataQuery: "quantity",
      },
      {
        name: "Category",
        dataQuery: "category",
      },
    ],
  };

  const GET_CLASS_DASHBOARD = gql`
    query getClassDashboard($classId: Int!) {
      getClassInfo(classId: $classId) {
        className
        prizes {
          id
          name
          kudosCost
          quantity
          category
        }
      }
    }
  `;

  useEffect(() => {
    getPrizesData();
  }, []);

  const [getPrizesData, { loading, error, data }] = useLazyQuery(
    GET_CLASS_DASHBOARD,
    {
      variables: { classId: props.selectedClassId },
      fetchPolicy: "network-only",
    }
  );

  if (loading) {
    return (
      <div>
        <h2>...loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2>there was an error :(</h2>
      </div>
    );
  }

  if (data && data.getClassInfo.prizes.length == 0) {
    return <p>There are no prizes</p>;
  }

  if (data) {
    const classPrizes = data.getClassInfo.prizes;

    return (
      <>
        <div className="panel">
          <h4 className="panel__title">
            Prizes for {data.getClassInfo.className}
          </h4>
          <Listing
            rows={classPrizes}
            config={listingData}
            refreshData={getPrizesData}
            classId={props.selectedClassId}
          />
        </div>
      </>
    );
  }

  return (
    <div>
      <h2>...loading...</h2>
    </div>
  );
};

export default TreasureBox;
