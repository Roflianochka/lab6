import data from "../jsons/EmployeesData.json";
import React, { useState, useEffect } from "react";
import EmployeesItem from "../pages/EmployeesItem";
import { Button, Modal, Form } from "react-bootstrap";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    id: null,
    firstName: "",
    lastName: "",
    phone: "",
    hourlyRate: "",
  });

  useEffect(() => {
    setEmployees(data);
  }, []);

  const handleDeleteEmployee = (employeeId) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== employeeId)
    );
  };

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployees((prevEmployees) =>
      prevEmployees.map((employee) =>
        employee.id === updatedEmployee.id ? updatedEmployee : employee
      )
    );
  };

  const handleShowAddModal = () => setShowAddModal(true);

  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setNewEmployee({
      id: null,
      firstName: "",
      lastName: "",
      phone: "",
      hourlyRate: "",
    });
  };

  const handleAddEmployee = () => {
    const newId = employees.length + 1;
    setEmployees((prevEmployees) => [
      ...prevEmployees,
      { ...newEmployee, id: newId },
    ]);
    handleCloseAddModal();
  };

  return (
    <>
      <div className="equipmentPage-container">
        {employees.map((employee) => (
          <EmployeesItem
            key={employee.id}
            employee={employee}
            onDelete={handleDeleteEmployee}
            onUpdate={handleUpdateEmployee}
          />
        ))}
        <Button variant="success" className="mb-3" onClick={handleShowAddModal}>
          Добавить работника
        </Button>
        <Modal show={showAddModal} onHide={handleCloseAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Добавить работника</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Имя</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите имя"
                  value={newEmployee.firstName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      firstName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Фамилия</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите фамилию"
                  value={newEmployee.lastName}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      lastName: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Телефон</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите номер телефона"
                  value={newEmployee.phone}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      phone: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Часовая оплата</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Введите часовую оплату"
                  value={newEmployee.hourlyRate}
                  onChange={(e) =>
                    setNewEmployee({
                      ...newEmployee,
                      hourlyRate: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseAddModal}>
              Закрыть
            </Button>
            <Button variant="primary" onClick={handleAddEmployee}>
              Добавить работника
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Employees;
