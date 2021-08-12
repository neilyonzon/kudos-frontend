import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";
import Button from "./elements/Button";
import PrizeModal from "./treasureBox/PrizeModal";

const TreasureBox = (props) => {
  useEffect(() => {
    if (props.userType === "teacher") {
      getTreasureBoxData({
        variables: {
          classId: props.selectedClassId,
        },
      });
    } else {
      getTreasureBoxData();
    }
  }, [props.selectedClassId]);


  const [openAddPrize, setOpenAddPrize] = useState(false);


  const handleAddPrizeModal = () => {
    setOpenAddPrize(!openAddPrize);
  };

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
        dataQuery: "category[category]",
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
            kudosCost
            quantity
            category {
              id
              category
            }
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
          category {
            id
            category
          }
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
      return <div className="treasure-box__container">
      <h2>Add your first prize for {data.getClassInfo.className}</h2>
      <Button clicked={handleAddPrizeModal} btnColor="green">Add Prize</Button>
      <PrizeModal
        addPrize={true}
        isOpen={openAddPrize}
        onClose={handleAddPrizeModal}
        refreshData={getTreasureBoxData}
        classId={props.selectedClassId}
        categories={props.categories}
      />
      </div>
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
            categories={props.categories}
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
