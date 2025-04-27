"use client"
import React, { useState, useRef } from 'react';
import ConfirmedReservationModal from '@/components/ConfirmedReservationModal';

export default function ReservationStudent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);
  const [submissionError, setSubmissionError] = useState<any>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/dashboard/reservation/student', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('File uploaded successfully:', result);
        setSubmissionResult(result);
        setSubmissionError(null);
        setIsModalOpen(true);
      } else {
        const error = await response.json();
        console.error('Error uploading file:', error);
        setSubmissionError(error);
        setSubmissionResult(null);
        setIsModalOpen(true);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setSubmissionError({ message: 'Failed to connect to the server.' });
      setSubmissionResult(null);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubmissionResult(null);
    setSubmissionError(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);

      // Update the file input with the dropped file
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        fileInputRef.current.files = dataTransfer.files;
      }
    }
  };

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the file input click
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white p-8 md:p-12 lg:p-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div>
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">User Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="unit_name" className="block text-sm font-medium mb-1">Name of School/Unit/Organization</label>
                  <input
                    id="unit_name"
                    name="unit_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="event_name" className="block text-sm font-medium mb-1">Name of Event</label>
                  <input
                    id="event_name"
                    name="event_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="representative_name" className="block text-sm font-medium mb-1">Name of Representative</label>
                  <input
                    id="representative_name"
                    name="representative_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="contact_number" className="block text-sm font-medium mb-1">Contact Number</label>
                  <input
                    id="contact_number"
                    name="contact_number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Type of Event Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Type of Event</h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input
                    id="sportsRelated"
                    name="event_types"
                    type="checkbox"
                    value="Sports-Related Activities"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="sportsRelated" className="ml-2">Sports-Related Activities</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="forumSymposium"
                    name="event_types"
                    type="checkbox"
                    value="Forum/Symposium"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="forumSymposium" className="ml-2">Forum/Symposium</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="generalAssembly"
                    name="event_types"
                    type="checkbox"
                    value="General Assembly/College Orientation"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="generalAssembly" className="ml-2">General Assembly/College Orientation</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="others"
                    name="others"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    onChange={(e) => {
                      const othersInput = document.getElementById('othersText') as HTMLInputElement | null;
                      if (othersInput) {
                        othersInput.disabled = !e.target.checked;
                        if (!e.target.checked) {
                          othersInput.value = '';
                        }
                      }
                    }}
                  />
                  <label htmlFor="others" className="mr-2">Others:</label>
                  <input
                    id="othersText"
                    name="event_types"
                    className="flex-1 px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Reservation Details Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Facilities</h2>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center">
                  <input
                    id="gymnasium"
                    name="facilities"
                    type="checkbox"
                    value="Gymnasium"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="gymnasium" className="ml-2">Gymnasium</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="dugout"
                    name="facilities"
                    type="checkbox"
                    value="Dugout"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="dugout" className="ml-2">Dugout</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="bleachers"
                    name="facilities"
                    type="checkbox"
                    value="Bleachers"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="bleachers" className="ml-2">Bleachers</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="footballField"
                    name="facilities"
                    type="checkbox"
                    value="Football Field"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="footballField" className="ml-2">Football Field</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="coveredCourt"
                    name="facilities"
                    type="checkbox"
                    value="Covered Court"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="coveredCourt" className="ml-2">Covered Court</label>
                </div>

                <div className="flex items-center">
                  <input
                    id="stage"
                    name="facilities"
                    type="checkbox"
                    value="Stage"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="stage" className="ml-2">Stage</label>
                </div>
              </div>
            </div>

            {/* Upload Letter Section - Simplified with single upload method */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Upload Letter of Request</h2>
              <div
                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'} ${selectedFile ? 'border-green-500 bg-green-50' : 'border-dashed'} rounded-md transition-colors duration-200 cursor-pointer`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  id="file-upload"
                  name="request_letter"
                  type="file"
                  className="hidden"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx"
                />

                {!selectedFile ? (
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                      <span className="relative bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, DOC up to 10MB</p>
                  </div>
                ) : (
                  <div className="space-y-2 text-center">
                    <div className="flex items-center justify-center">
                      <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-900 font-medium truncate max-w-xs">
                      {selectedFile.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-xs text-red-500 hover:text-red-700 font-medium mt-1 focus:outline-none"
                    >
                      Remove file
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Date Range Picker */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 pb-2 border-b">Reservation Date Range</h2>
              <div id="date-range-picker" className="flex flex-col md:flex-row md:items-center">
                <div className="relative mb-4 md:mb-0 md:flex-1">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-start"
                    name="start_date"
                    type="date"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Select date start"
                  />
                </div>
                <span className="mx-2 md:mx-4 text-gray-500 text-center my-2 md:my-0">to</span>
                <div className="relative md:flex-1">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                  </div>
                  <input
                    id="datepicker-range-end"
                    name="end_date"
                    type="date"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="Select date end"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full justify-center mt-8">
              <button
                type="submit"
                className="w-full px-10 p-4 bg-[#283971] text-white font-medium rounded-md hover:cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md"
              >
                Submit Reservation
              </button>
            </div>
          </div>
        </div>
      </form>

      {isModalOpen && (
        <ConfirmedReservationModal
          onClose={handleCloseModal}
          submissionResult={submissionResult}
          submissionError={submissionError}
        />
      )}
    </div>
  );
}