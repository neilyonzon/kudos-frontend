import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const TreasureBox = (props) => {

  useEffect(() => {
    if(props.userType === 'teacher'){
      getTreasureBoxData({
        variables: {
          classId: props.selectedClassId
        }
      })
    } else {
      getTreasureBoxData()
    }
  }, [props.selectedClassId]);

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

  let GET_TREASURE_BOX 
  if(props.userType === 'teacher'){
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
    `
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
    `
  }

  const [getTreasureBoxData, { loading, error, data }] = useLazyQuery(
    GET_TREASURE_BOX,
    {
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

  if (data) {
    const classPrizes = props.userType === 'teacher' ? data.getClassInfo.prizes : data.getClassPrizes
    if(classPrizes.length === 0){
      return <p>There are no prizes</p>
    }

    return (
      <>
        <div className="panel">
          {props.userType === 'teacher' ?
            <h4 className="panel__title">
              Prizes for {data.getClassInfo.className}
            </h4>
            : null
          }
          {/* <Listing
            rows={classPrizes}
            config={listingData}
            refreshData={getTreasureBoxData}
            classId={props.userType === 'teacher' ? props.selectedClassId : null}
          /> */}
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
