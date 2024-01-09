import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import faqData from "../jsons/QuestionsData.json";

const FaqPage = () => {
  const [faqItems, setFaqItems] = useState([]);

  useEffect(() => {
    setFaqItems(faqData);
  }, []);

  return (
    <div>
      {faqItems.map((item) => (
        <Card key={item.id} className="mb-3">
          <Card.Header>
            <Card.Title>{item.question}</Card.Title>
          </Card.Header>
          <Card.Body>
            <Card.Text>{item.answer}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FaqPage;
