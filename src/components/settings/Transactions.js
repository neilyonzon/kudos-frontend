import React, { useState, useEffect} from "react";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import ClassSelector from "../home/ClassSelector";
import TransactionGroup from "./TransactionCard";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";

const Transactions = (props) => {
  const [selectedClassId, setSelectedClassId] = useState(props.classes[0].id);

  useEffect(() => {
    getTransactionsData();
  }, [props.selectedClassId]);

  const onSelectClassHandler = (e) => {
    const selectedClassName = e.target.value;
    const selectedClass = props.classes.find((cls) => {
      return cls.className === selectedClassName;
    });
    setSelectedClassId(selectedClass.id);
  };

  let GET_TRANSACTIONS
  GET_TRANSACTIONS = gql`
      query getClassTransactions($classId: Int!) {
        getTransactions(classId: $classId) {
          id
          approved
          prizeId
          prizeName
          prizeImageUrl
          prizeCost
          createdAt
          givenDate
          student {
            firstName
            lastName
          }
        }
      } 
    `

  const [getTransactionsData, { loading, error, data }] = useLazyQuery(
    GET_TRANSACTIONS, 
    {
      variables: { classId: selectedClassId},
      fetchPolicy: "network-only",
    }
  ) 


  if (data) {
    return (
      <>
        <div className="utility-bar utility-bar--space-between utility-bar--transactions">
          <div className="utility-bar__dropdowns">
            <ClassSelector
              onSelectClass={onSelectClassHandler}
              classes={props.classes}
            />
          </div>
          <AiOutlineSearch className="icon-search" />
        </div>
        <div className="transactions">
          {data.getTransactions.map((transaction)=> {
            return (
              <TransactionGroup
                student={transaction.student}
                key={transaction.id}
                prizeName={transaction.prizeName}
                prizeCost={transaction.prizeCost}
                givenDate={transaction.givenDate}
                id={transaction.id}
                loadUserInfo={props.loadUserInfo}
                />
            )
          })}
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

export default Transactions;