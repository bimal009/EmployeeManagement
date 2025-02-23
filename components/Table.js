"use client";

import React, { useEffect, useState } from "react";
import { IoPersonAddSharp } from "react-icons/io5";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import { employees } from "./data";

const DataTable = () => {
  const [showForm, setShowForm] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [birthday, setBirthday] = useState("");
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    setData(employees);
  }, []);

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      // Update existing employee
      const updatedData = data.map((item) => {
        if (item.id === editingId) {
          return {
            ...item,
            name,
            email,
            salary: Number(salary),
            birthday,
            active: status,
          };
        }
        return item;
      });
      setData(updatedData);
    } else {
      // Add new employee
      const newEmployee = {
        id: Date.now(),
        name,
        email,
        salary: Number(salary),
        birthday,
        active: status,
      };
      setData((prev) => [...prev, newEmployee]);
    }

    setName("");
    setEmail("");
    setSalary("");
    setBirthday("");
    setStatus("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const employeeToEdit = data.find((item) => item.id === id);
    if (employeeToEdit) {
      setEditingId(id);
      setName(employeeToEdit.name);
      setEmail(employeeToEdit.email);
      setSalary(employeeToEdit.salary.toString());
      setBirthday(employeeToEdit.birthday);
      setStatus(employeeToEdit.active);
      setShowForm(!showForm);
    }
  };

  return (
    <div className="p-4">
      <div className="sm:mt-10 lg:mt-14">
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) setEditingId(null);
          }}
          className="flex justify-center items-center bg-primary p-4 rounded-xl text-white font-bold"
        >
          Add Employee
          <IoPersonAddSharp className="ml-2 text-xl" />
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg mx-auto mt-4"
        >
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            {editingId ? "Edit Employee" : "Add Employee"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Full Name"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter Email"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary"
              required
            />
            <input
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              type="number"
              placeholder="Enter Salary"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary sm:col-span-2"
              required
            />
            <input
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              type="date"
              className="bg-gray-100 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-secondary sm:col-span-2"
              required
            />
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="Active"
                checked={status === "Active"}
                onChange={(e) => setStatus(e.target.value)}
                className="hidden peer"
                required
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-green-500 peer-checked:bg-green-200 transition duration-200"></div>
              <span className="text-gray-700 font-medium">Active</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="Inactive"
                checked={status === "Inactive"}
                onChange={(e) => setStatus(e.target.value)}
                className="hidden peer"
              />
              <div className="w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center peer-checked:border-red-500 peer-checked:bg-red-200 transition duration-200"></div>
              <span className="text-gray-700 font-medium">Inactive</span>
            </label>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center bg-primary hover:bg-muted-primary px-5 py-3 rounded-lg text-white font-semibold transition"
            >
              {editingId ? "Update" : "Add"}
              <IoPersonAddSharp className="ml-2 text-xl" />
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto mt-10">
        <Table className="min-w-full">
          <TableHeader className="bg-primary font-bold text-secondary">
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Birthday</TableHead>
              <TableHead>Salary</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.birthday}</TableCell>
                <TableCell>${item.salary}</TableCell>
                <TableCell>
                  {item.active === "Active" ? (
                    <span className="bg-green-500 text-white py-1 px-4 rounded">
                      Active
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white py-1 px-4 rounded">
                      Inactive
                    </span>
                  )}
                </TableCell>
                <TableCell className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="bg-primary text-white py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white py-1 px-4 rounded"
                  >
                    DELETE
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
