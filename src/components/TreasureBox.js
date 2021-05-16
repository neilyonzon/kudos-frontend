import React, { useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { GiOpenTreasureChest } from "@react-icons/all-files/gi/GiOpenTreasureChest";
import Listing from "../components/listing/Listing";

const TreasureBox = (props) => {
  const [listingData, setClassData] = useState({
    type: "prizes",
    columns: [
      {
        name: "Name",
        dataQuery: "name",
      },
      { name: "Cost", dataQuery: "kudosBalance" },
      { name: "Qty", dataQuery: "kudosBalance" },
      { name: "Category", dataQuery: "kudosBalance" },
    ],
  });

  const GET_CLASS_DASHBOARD = gql`
    query getClassDashboard($classId: Int!) {
      getClassInfo(classId: $classId) {
        className
        treasureBoxOpen
        students {
          id
          firstName
          lastName
          username
          imageUrl
          kudosBalance
          transactions {
            id
            approved
            prizeId
            prizeName
            prizeCost
            prizeImageUrl
          }
        }
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
    getClassData();
  }, []);

  const [getClassData, { loading, error, data }] = useLazyQuery(
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

  // if no students, prompt teacher to add students
  // if(data && !data.getClassInfo.students){

  // }

  if (data) {
    const classStudents = data.getClassInfo.students;

    return (
      <>
        <h4 className="panel__title">Your Prizes</h4>
        <div className="panel">
          <h4 className="panel__title">
            Prizes for {data.getClassInfo.className}
          </h4>
          <Listing
            rows={classStudents}
            config={listingData}
            refreshData={getClassData}
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
