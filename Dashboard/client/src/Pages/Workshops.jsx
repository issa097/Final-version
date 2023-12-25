import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Statics from './Statics';

const tableStyles = {
  overflowX: "auto",
};

function Workshops({
  totalPages,
  pageNumber,
  handlePageChange,
}) {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    workshopName: '',
    workshopDescription: '',
    workshopTime: '',
    workshopImage: null, 
  });

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get('http://localhost:8000/getAllShop');
        setWorkshops(response.data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`issa/${id}`);
      setWorkshops((prevWorkshops) => prevWorkshops.filter((workshop) => workshop.id !== id));
    } catch (error) {
      console.error('Error deleting workshop:', error);
    }
  };

  const handleEdit = async (updatedWorkshop) => {
    try {
      await axios.put(`issa/${updatedWorkshop.id}`, updatedWorkshop);
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop.id === updatedWorkshop.id ? updatedWorkshop : workshop
        )
      );
    } catch (error) {
      console.error('Error updating workshop:', error);
    }
  };

  const handleFormChange = (e) => {
    if (e.target.name === 'workshopImage') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {

      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('workshopName', formData.workshopName);
      formDataToSend.append('workshopDescription', formData.workshopDescription);
      formDataToSend.append('workshopTime', formData.workshopTime);
      formDataToSend.append('workshopImage', formData.workshopImage);

      const response = await axios.post('/', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setWorkshops((prevWorkshops) => [...prevWorkshops, response.data]);
      setShowForm(false);
      setFormData({
        workshopName: '',
        workshopDescription: '',
        workshopTime: '',
        workshopImage: null,
      });
    } catch (error) {
      console.error('Error creating workshop:', error);
    }
  };

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Statics />
      <h2 className="text-3xl font-bold pt-[3rem] text-center text-[#C08261] mb-4">
        Workshops
      </h2>
      <div className="flex justify-center mt-4">
        <button
          onClick={handleButtonClick}
          className="px-4 py-2 rounded bg-[#C08261] text-white"
        >
          Add Workshop
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md p-6 rounded-lg">
            <button
              onClick={handleButtonClick}
              className="absolute top-4 right-4 text-gray-700 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label htmlFor="workshopName" className="block text-gray-700 text-sm font-bold mb-2">
                  Workshop Name:
                </label>
                <input
                  type="text"
                  id="workshopName"
                  name="workshopName"
                  value={formData.workshopName}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop name"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="workshopDescription" className="block text-gray-700 text-sm font-bold mb-2">
                  Workshop Description:
                </label>
                <textarea
                  id="workshopDescription"
                  name="workshopDescription"
                  value={formData.workshopDescription}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop description"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="workshopTime" className="block text-gray-700 text-sm font-bold mb-2">
                  Workshop Time:
                </label>
                <input
                  type="text"
                  id="workshopTime"
                  name="workshopTime"
                  value={formData.workshopTime}
                  onChange={handleFormChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter workshop time"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="workshopImage" className="block text-gray-700 text-sm font-bold mb-2">
                  Workshop Image:
                </label>
                <input
                  type="file"
                  id="workshopImage"
                  name="workshopImage"
                  onChange={handleFormChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#C08261] hover:bg-[#E2C799] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleButtonClick}
                  className="ml-2 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

        <div className="overflow-hidden rounded-lg border border-[#C08261] shadow-md m-5">
          <div className="table-container" style={tableStyles}>
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-[#C08261]">
                <tr>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Description
                  </th>
                  <th
                    className="px-6 py-4  font-medium text-gray-900"
                  >
                    Time
                  </th>
                  <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {workshops.map((workshop, index) => (
                  <tr
                    key={workshop.id}
                    className={`hover:bg-gray-50 ${
                      index % 2 !== 0 ? 'bg-white' : 'bg-[#F7F1EE]'
                    }`}
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full object-cover object-center"
                          src={workshop.workshop_img}
                          alt=""
                        />
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {workshop.workshop_name}
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                        {workshop.workshop_dis}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{workshop.workshop_end}</td>
                    <td className="px-6 py-4 ">
                      <div className="flex justify-end gap-4">
                      <button
              className="text-grey-500 px-4 py-2 rounded"
              onClick={() => handleDelete(workshop.workshop_id)}
            >
              {/* Delete SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {/* ... Delete SVG path ... */}
              </svg>
            </button>
            <button
              className="text-grey-500 px-4 py-2 rounded"
              onClick={() => handleEdit(workshop)}
            >
              {/* Edit SVG icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                {/* ... Edit SVG path ... */}
              </svg>
            </button>
                        {/* Display pagination controls */}
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
          </div>
        <div className="flex justify-center mb-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-2 px-4 py-2 rounded ${
                pageNumber === index + 1
                  ? 'bg-[#C08261] text-white'
                  : 'bg-white text-[#C08261] border border-[#C08261]'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default Workshops;
