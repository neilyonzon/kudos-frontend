import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const TreasureBox = (props) => {
  useEffect(() => {
    if (props.userType === "teacher") {
      console.log("for some reason made it here");
      getTreasureBoxData({
        variables: {
          classId: props.selectedClassId,
        },
      });
    } else {
      getTreasureBoxData();
    }
  }, [props.selectedClassId]);

  const listingData = {
    type: props.userType === "teacher" ? "prizes" : "treasureBox",
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
        name: props.userType === "teacher" ? "Qty" : "# Available",
        dataQuery: "quantity",
      },
      {
        name: "Category",
        dataQuery: "category",
      },
    ],
  };

  let GET_TREASURE_BOX;
  if (props.userType === "teacher") {
    GET_TREASURE_BOX = gql`
      query getTreasureBox($classId: Int!) {
        getClassInfo(classId: $classId) {
          className
          prizes {
            id
            name
            imageUrl
            description
            category
            kudosCost
            quantity
          }
        }
      }
    `;
  } else {
    GET_TREASURE_BOX = gql`
      query getTreasureBox {
        getClassPrizes {
          id
          name
          imageUrl
          description
          category
          kudosCost
          quantity
        }
      }
    `;
  }

  const [getTreasureBoxData, { loading, error, data }] = useLazyQuery(
    GET_TREASURE_BOX,
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
    console.log("error!!!", error);
    return (
      <div>
        <h2>there was an error</h2>
      </div>
    );
  }

  if (data) {
    const classPrizes =
      props.userType === "teacher"
        ? data.getClassInfo.prizes
        : data.getClassPrizes;
    if (classPrizes.length === 0) {
      return <p>There are no prizes</p>;
    }

    return (
      <>
        <div className="panel">
          <h4 className="panel__title">
            {props.userType === "teacher"
              ? `Prizes for ${data.getClassInfo.className}`
              : "Available Prizes"}
          </h4>
          <Listing
            rows={classPrizes}
            config={listingData}
            refreshData={getTreasureBoxData}
            classId={
              props.userType === "teacher" ? props.selectedClassId : null
            }
            userType={props.userType}
            kudosBalance={props.kudosBalance}
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
