import React, { useState, useEffect } from "react";
import data from "../jsons/CommisionsData.json";
import "../styles/Commisions.css";
import CommisionsItem from "./CommisionsItem";

const Commisions = () => {
  const [commissions, setCommissions] = useState([]);

  useEffect(() => {
    setCommissions(data);
  }, []);

  const handleMemberDelete = (commissionId, memberId) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.filter(
          (member) => member.id !== memberId
        );

        if (updatedMembers.length === 0) {
          return null;
        }

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    const filteredCommissions = updatedCommissions.filter(
      (commission) => commission !== null
    );

    setCommissions(filteredCommissions);
  };

  const handleCommissionAdd = () => {
    const newCommissionId = Math.max(...commissions.map((c) => c.id), 0) + 1;

    const newCommission = {
      id: newCommissionId,
      name: "New Commission",
      members: [],
    };

    setCommissions([...commissions, newCommission]);
  };

  const handleMemberAdd = (commissionId, newMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = [...commission.members, newMember];
        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    setCommissions(updatedCommissions);
  };

  const handleMemberEdit = (commissionId, memberId, updatedMember) => {
    const updatedCommissions = commissions.map((commission) => {
      if (commission.id === commissionId) {
        const updatedMembers = commission.members.map((member) =>
          member.id === memberId ? { ...member, ...updatedMember } : member
        );

        return { ...commission, members: updatedMembers };
      }
      return commission;
    });

    setCommissions(updatedCommissions);
  };

  return (
    <div className="commissions-container">
      {commissions.map((commission) => (
        <CommisionsItem
          key={commission.id}
          commission={commission}
          onMemberDelete={handleMemberDelete}
          onMemberAdd={handleMemberAdd}
          onMemberEdit={handleMemberEdit}
        />
      ))}
      <button onClick={handleCommissionAdd}>Добавить комиссию</button>
    </div>
  );
};

export default Commisions;
