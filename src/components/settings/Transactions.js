import React, { useState, useEffect} from "react";
import { gql, useLazyQuery } from "@apollo/client";
import ClassSelector from "../home/ClassSelector";
import TransactionGroup from "./TransactionCard";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";

const Transactions = (props) => {
  const [selectedClassId, setSelectedClassId] = useState(props.classes[0] ? props.classes[0].id : null);

  useEffect(() => {
    selectedClassId && getTransactionsData();
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

  const [getTransactionsData, { loading, data }] = useLazyQuery(
    GET_TRANSACTIONS, 
    {
      variables: { classId: selectedClassId },
      fetchPolicy: "network-only",
    }
  ) 

  if (loading) {
    return (
      <div>
        <h2>...loading...</h2>
      </div>
    );
  }

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
          {data.getTransactions.length > 0 ? data.getTransactions.map((transaction)=> {
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
          })
        :
        <div>
          <h2>There are no pending transactions from your students in this class.</h2>
        </div> 
        }
        </div>
      </>
    );
  }

  return (
    <div>
      <h2>You don't have any classes! Go to the Classes tab to add a class.</h2>
    </div>
  )

};

export default Transactions;
