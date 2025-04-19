import React from 'react'

const LocationSearchPanel = ({ suggestions, setPanelOpen, setVehiclePanel, setPickup, setDestination, activeField , pickup, destination }) => {
    return (
        <div className='p-4'>
            {suggestions && suggestions.length > 0 && suggestions.map((suggestion, index) => {
                // Access the description from the suggestion object
                const locationText = suggestion.description || suggestion;
                
                return (
                    <div 
                        onClick={() => {
                            if (activeField === 'pickup') {
                                setPickup(locationText);
                            } else {
                                setDestination(locationText);
                            }
                            // if (pickup && destination) {
                            //     setVehiclePanel(true);
                            //     setPanelOpen(false);
                            // }
                        }} 
                        key={index} 
                        className='border-gray-200 border-2 active:border-black rounded-lg flex flex-row gap-4 mb-2 items-center justify-start px-3 py-2 hover:bg-gray-50 cursor-pointer'
                    >
                        <h2><i className="ri-map-pin-fill text-gray-500"></i></h2>
                        <h4 className='font-medium text-sm'>{locationText}</h4>
                    </div>
                )
            })}
            
            {suggestions && suggestions.length === 0 && (
                <div className='text-center text-gray-500 py-4'>
                    Type to search locations...
                </div>
            )}
        </div>
    )
}

export default LocationSearchPanel