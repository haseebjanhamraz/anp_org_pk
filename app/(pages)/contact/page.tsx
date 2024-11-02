import React from 'react';

const Contact = () => {
    return (
        <div className="h-screen p-6 sm:p-12 md:p-16 lg:p-20">
            <div className="max-w-4xl mx-auto p-8 shadow-lg rounded-lg">
                {/* Contact Heading */}
                <h1 className="text-3xl font-bold text-center text-red-600 mb-8">Contact Us</h1>

                {/* Contact Details Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start mb-10 space-y-8 lg:space-y-0 lg:space-x-8">
                    {/* Contact Information */}
                    <div className="w-full lg:w-1/2 dark:text-white">
                        <h2 className="text-xl font-semibold mb-4">Our Contact Details</h2>
                        <p className="text-gray-700 mb-2 dark:text-white"><strong>Phone:</strong> +92 (091) 2246851-2-3</p>
                        <p className="text-gray-700 mb-2 dark:text-white"><strong>Email:</strong> info@anp.org.pk</p>
                        <p className="text-gray-700 mb-4 dark:text-white"><strong>Address:</strong> Bacha Khan Markaz, Pajaggi Road, Peshawar, Pakhtunkhwa</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
