import React, { useState, useMemo } from 'react';
import MilitaryUnitsSummary from './components/MilitaryUnitsSummary';

// Define a standardized resource order
const resourceOrder = [
  // Military
  "Knight", "KnightT2", "KnightT3",
  "Crossbowman", "CrossbowmanT2", "CrossbowmanT3",
  "Paladin", "PaladinT2", "PaladinT3",
  // Transportation
  "Donkey",
  // Basic resources (in natural order)
  "Wood", "Stone", "Coal", "Copper", "Obsidian", "Silver", "Ironwood", 
  "ColdIron", "Gold", "Hartwood", "Diamonds", "Sapphire", "Ruby", 
  "DeepCrystal", "Ignium", "EtherealSilica", "TrueIce", "TwilightQuartz", 
  "AlchemicalSilver", "Adamantine", "Mithral", "Dragonhide",
  // Others
  "Lords", "Labor", "AncientFragment", "Wheat", "Fish"
];

// Check if a resource is a military unit
const isMilitaryUnit = (resourceName) => {
  // Normalize the resource name
  const normalizedName = resourceName.replace(/\s+/g, "");
  
  return [
    "Knight", "KnightT2", "KnightT3",
    "Crossbowman", "CrossbowmanT2", "CrossbowmanT3",
    "Paladin", "PaladinT2", "PaladinT3"
  ].includes(normalizedName);
};

const ResourceDashboard = () => {
  // State for tabs: 'data-entry', 'resources', 'military'
  const [activeTab, setActiveTab] = useState('data-entry');
  const [sortConfig, setSortConfig] = useState({
    key: 'resource',  // Default to sorting by resource name
    direction: 'ascending'  // Default to ascending order
  });
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for storing game data
  const [gameData, setGameData] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date().toISOString());
  
  // State for JSON input
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState('');

  // Get all realms dynamically from gameData
  const allRealms = useMemo(() => {
    return gameData.map(realm => ({
      entityId: realm.entityId,
      name: realm.name
    }));
  }, [gameData]);

  // Generate realm order dynamically based on loaded data
  const realmOrder = useMemo(() => {
    const order = {};
    allRealms.forEach((realm, index) => {
      order[realm.name] = index + 1;
    });
    return order;
  }, [allRealms]);

  // Sort realms alphabetically by default
  const sortedRealms = useMemo(() => {
    return [...allRealms].sort((a, b) => a.name.localeCompare(b.name));
  }, [allRealms]);

  // Get all unique resource names from the data
  const allResources = useMemo(() => {
    const resourceSet = new Set();
    gameData.forEach(realm => {
      realm.resources.forEach(resource => {
        resourceSet.add(resource.name);
      });
    });
    return Array.from(resourceSet);
  }, [gameData]);

  // Helper function to normalize resource names for comparison
  const normalizeResourceName = (name) => {
    // Remove spaces and convert to the format used in resourceOrder
    return name.replace(/\s+/g, "");
  };

  // Sort resources according to the defined order
  const sortedResources = useMemo(() => {
    // Return empty array if no resources
    if (allResources.length === 0) return [];
    
    // Create a new array to avoid modifying the original
    const resources = [...allResources];
    
    // First, sort all resources based on the predefined order
    resources.sort((a, b) => {
      // Normalize resource names to match the format in resourceOrder
      const aNormalized = normalizeResourceName(a);
      const bNormalized = normalizeResourceName(b);
      
      const aIndex = resourceOrder.indexOf(aNormalized);
      const bIndex = resourceOrder.indexOf(bNormalized);
      
      // Both resources are in the predefined order
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } 
      // Only resource 'a' is in the predefined order
      else if (aIndex !== -1) {
        return -1;
      } 
      // Only resource 'b' is in the predefined order
      else if (bIndex !== -1) {
        return 1;
      } 
      // Neither resource is in the predefined order, fall back to alphabetical
      else {
        return a.localeCompare(b);
      }
    });
    
    return resources;
  }, [allResources]);

  // Get military units - ensure we preserve the order
  const militaryUnits = useMemo(() => {
    // Create a new array with only military units, preserving the original order
    return sortedResources.filter(r => isMilitaryUnit(r));
  }, [sortedResources]);

  // Get economic resources - ensure we preserve the order
  const economicResources = useMemo(() => {
    // Create a new array with non-military resources, preserving the original order
    return sortedResources.filter(r => !isMilitaryUnit(r));
  }, [sortedResources]);

  // Further filter resources by search term
  const searchFilteredResources = useMemo(() => {
    const resources = activeTab === 'military' ? militaryUnits : economicResources;
    if (!searchTerm) return resources;
    const lowerCaseSearch = searchTerm.toLowerCase();
    return resources.filter(r => 
      r.toLowerCase().includes(lowerCaseSearch)
    );
  }, [militaryUnits, economicResources, activeTab, searchTerm]);

  // Create a data matrix for the flipped table
  const resourceMatrix = useMemo(() => {
    // For each resource, collect values from all realms
    const matrix = {};
    
    // We need to process ALL resources, not just filtered ones,
    // because the military view needs access to military resources
    sortedResources.forEach(resource => {
      matrix[resource] = {};
      
      sortedRealms.forEach(realm => {
        const realmData = gameData.find(r => r.entityId === realm.entityId);
        if (realmData) {
          const resourceData = realmData.resources.find(r => r.name === resource);
          matrix[resource][realm.name] = resourceData ? resourceData.totalAmount : 0;
        } else {
          matrix[resource][realm.name] = 0;
        }
      });
      
      // Add total for this resource
      matrix[resource].total = Object.values(matrix[resource]).reduce((sum, val) => sum + val, 0);
    });
    
    return matrix;
  }, [sortedResources, sortedRealms, gameData]);

  // Handle JSON data submission
  const handleJsonSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      
      // Validate expected structure (array of realms with resources)
      if (!Array.isArray(parsedData)) {
        throw new Error('Data must be an array of realms');
      }
      
      // Basic validation of each realm
      parsedData.forEach((realm, index) => {
        if (!realm.entityId) {
          throw new Error(`Realm at index ${index} is missing entityId`);
        }
        if (!realm.name) {
          throw new Error(`Realm at index ${index} is missing name`);
        }
        if (!Array.isArray(realm.resources)) {
          throw new Error(`Realm "${realm.name}" has invalid resources (not an array)`);
        }
      });
      
      // Set the data and update timestamp
      setGameData(parsedData);
      setLastUpdated(new Date().toISOString());
      setJsonError('');
      
      // Switch to resources tab if successful
      setActiveTab('resources');
    } catch (error) {
      setJsonError(`Error parsing JSON: ${error.message}`);
    }
  };

  // Function to load sample data
  const loadSampleData = () => {
    // Sample data with a minimal structure
    const sampleData = [
      {
        "entityId": 1,
        "name": "Sample Realm 1",
        "resources": [
          {
            "name": "Wood",
            "totalAmount": 1000
          },
          {
            "name": "Stone",
            "totalAmount": 500
          },
          {
            "name": "Knight",
            "totalAmount": 100
          }
        ]
      },
      {
        "entityId": 2,
        "name": "Sample Realm 2",
        "resources": [
          {
            "name": "Wood",
            "totalAmount": 750
          },
          {
            "name": "Copper",
            "totalAmount": 250
          },
          {
            "name": "Crossbowman",
            "totalAmount": 50
          }
        ]
      }
    ];
    
    setJsonInput(JSON.stringify(sampleData, null, 2));
  };
  
  // Function to clear all data
  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data?')) {
      setGameData([]);
      setJsonInput('');
      setActiveTab('data-entry');
    }
  };

  // Function to handle column header click for sorting
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
  };

  // Function to format large numbers with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Sorted resources based on current sort configuration
  const sortedResourceRows = useMemo(() => {
    // Start with filtered resources
    let resources = [...searchFilteredResources];
    
    // If sorting by resource name, apply resource order
    if (sortConfig.key === 'resource') {
      resources.sort((a, b) => {
        // Normalize resource names to match the format in resourceOrder
        const aNormalized = normalizeResourceName(a);
        const bNormalized = normalizeResourceName(b);
        
        const aIndex = resourceOrder.indexOf(aNormalized);
        const bIndex = resourceOrder.indexOf(bNormalized);
        
        // Both resources are in the predefined order
        if (aIndex !== -1 && bIndex !== -1) {
          // When ascending, use the order defined in resourceOrder
          // When descending, reverse that order
          return sortConfig.direction === 'ascending' 
            ? aIndex - bIndex 
            : bIndex - aIndex;
        } 
        // Only resource 'a' is in the predefined order
        else if (aIndex !== -1) {
          // Predefined resources come first in ascending order
          // Predefined resources come last in descending order
          return sortConfig.direction === 'ascending' ? -1 : 1;
        } 
        // Only resource 'b' is in the predefined order
        else if (bIndex !== -1) {
          // Predefined resources come first in ascending order
          // Predefined resources come last in descending order
          return sortConfig.direction === 'ascending' ? 1 : -1;
        } 
        // Neither resource is in the predefined order
        else {
          // Fall back to alphabetical
          return sortConfig.direction === 'ascending' 
            ? a.localeCompare(b) 
            : b.localeCompare(a);
        }
      });
    } 
    // If sorting by total, sort by total resource amounts
    else if (sortConfig.key === 'total') {
      resources.sort((a, b) => {
        const aTotal = resourceMatrix[a]?.total || 0;
        const bTotal = resourceMatrix[b]?.total || 0;
        return sortConfig.direction === 'ascending' 
          ? aTotal - bTotal 
          : bTotal - aTotal;
      });
    } 
    // If sorting by a realm column, sort by realm-specific amounts
    else {
      resources.sort((a, b) => {
        const aValue = resourceMatrix[a]?.[sortConfig.key] || 0;
        const bValue = resourceMatrix[b]?.[sortConfig.key] || 0;
        return sortConfig.direction === 'ascending' 
          ? aValue - bValue 
          : bValue - aValue;
      });
    }
    
    return resources;
  }, [searchFilteredResources, sortConfig, resourceMatrix]);

  // Render tab header
  const renderTabHeader = () => (
    <div className="flex border-b border-gray-300 dark:border-gray-700 mb-6">
      <button 
        className={`py-2 px-4 ${activeTab === 'data-entry' 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        onClick={() => setActiveTab('data-entry')}
      >
        Data Entry
      </button>
      <button 
        className={`py-2 px-4 ${activeTab === 'resources' 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        onClick={() => setActiveTab('resources')}
        disabled={gameData.length === 0}
      >
        Resources View
      </button>
      <button 
        className={`py-2 px-4 ${activeTab === 'military' 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        onClick={() => setActiveTab('military')}
        disabled={gameData.length === 0}
      >
        Military Units
      </button>
    </div>
  );

  // Render search
  const renderSearch = () => (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <label htmlFor="search" className="block text-sm font-medium mb-1">Search Resources</label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Search by resource name..."
          className="w-full p-2 border rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );

  // Render Data Entry tab
  const renderDataEntry = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Enter Game Data</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Paste your JSON data below. The data should be an array of realms, with each realm having a name, entityId, and a resources array.
      </p>
      
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={loadSampleData}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Load Sample Data
        </button>
        <button 
          onClick={clearData}
          className="px-4 py-2 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 rounded hover:bg-red-200 dark:hover:bg-red-800"
          disabled={gameData.length === 0}
        >
          Clear Data
        </button>
      </div>
      
      <form onSubmit={handleJsonSubmit}>
        <div className="mb-4">
          <label htmlFor="jsonInput" className="block text-sm font-medium mb-1">JSON Data</label>
          <textarea
            id="jsonInput"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={15}
            className="w-full p-2 border rounded font-mono text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            placeholder='[
  {
    "entityId": 1,
    "name": "Realm Name",
    "resources": [
      {
        "name": "Wood",
        "totalAmount": 1000
      }
    ]
  }
]'
          />
        </div>
        
        {jsonError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100 rounded">
            {jsonError}
          </div>
        )}
        
        <button 
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Load Data
        </button>
      </form>
    </div>
  );

  const renderResourcesTable = () => (
    <div className="overflow-auto max-h-[70vh]">
      <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
          <tr>
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-left sticky left-0 top-0 bg-gray-100 dark:bg-gray-700 z-20"
              onClick={() => handleSort('resource')}
            >
              Resource {sortConfig.key === 'resource' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
            {sortedRealms.map(realm => (
              <th 
                key={realm.entityId}
                className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-right"
                onClick={() => handleSort(realm.name)}
              >
                {realm.name} {sortConfig.key === realm.name && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
            ))}
            <th 
              className="px-4 py-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 text-right font-bold"
              onClick={() => handleSort('total')}
            >
              Total {sortConfig.key === 'total' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedResourceRows.map((resource, index) => (
            <tr 
              key={resource} 
              className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
            >
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium sticky left-0 bg-inherit z-10">
                {resource}
              </td>
              {sortedRealms.map(realm => (
                <td 
                  key={`${resource}-${realm.name}`} 
                  className={`px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right ${
                    resourceMatrix[resource]?.[realm.name] > 0 ? 'font-medium' : 'text-gray-500'
                  }`}
                >
                  {formatNumber(resourceMatrix[resource]?.[realm.name] || 0)}
                </td>
              ))}
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                {formatNumber(resourceMatrix[resource]?.total || 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render military units view with table and cards
  const renderMilitaryUnits = () => {
    // Group military units by type
    const groupedUnits = {
      Knight: militaryUnits.filter(u => u.includes('Knight')),
      Crossbowman: militaryUnits.filter(u => u.includes('Crossbowman')),
      Paladin: militaryUnits.filter(u => u.includes('Paladin'))
    };
    
    // Color coding for different unit types
    const unitColors = {
      Knight: 'border-red-500',
      KnightT2: 'border-red-400',
      KnightT3: 'border-red-300',
      Crossbowman: 'border-blue-500',
      CrossbowmanT2: 'border-blue-400',
      CrossbowmanT3: 'border-blue-300',
      Paladin: 'border-green-500',
      PaladinT2: 'border-green-400',
      PaladinT3: 'border-green-300'
    };
    
    return (
      <>
        {/* Military Units Summary Component - Pass gameData as prop */}
        <MilitaryUnitsSummary gameData={gameData} />
        
        {/* Military Units Table */}
        <div className="overflow-auto max-h-[70vh] mb-8">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
              <tr>
                <th className="px-4 py-2 text-left sticky left-0 top-0 bg-gray-100 dark:bg-gray-700 z-20">Unit Type</th>
                {sortedRealms.map(realm => (
                  <th key={realm.entityId} className="px-4 py-2 text-right">
                    {realm.name}
                  </th>
                ))}
                <th className="px-4 py-2 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {militaryUnits.length > 0 ? (
                militaryUnits.map((unit, index) => {
                  const unitClass = unit.includes('Knight') 
                    ? 'bg-red-50 dark:bg-red-900/20' 
                    : unit.includes('Crossbowman') 
                      ? 'bg-blue-50 dark:bg-blue-900/20' 
                      : 'bg-green-50 dark:bg-green-900/20';
                  
                  return (
                    <tr 
                      key={unit} 
                      className={`${unitClass} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
                    >
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium sticky left-0 bg-inherit z-10">
                        {unit}
                      </td>
                      {sortedRealms.map(realm => (
                        <td 
                          key={`${unit}-${realm.name}`} 
                          className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right"
                        >
                          {formatNumber(resourceMatrix[unit]?.[realm.name] || 0)}
                        </td>
                      ))}
                      <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                        {formatNumber(resourceMatrix[unit]?.total || 0)}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={sortedRealms.length + 2} className="px-4 py-4 text-center text-gray-500 dark:text-gray-400">
                    No military units found in the current data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Military Units Cards */}
        <h3 className="text-xl font-bold mb-4">Military Units By Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Knights */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-red-500">Knights</h4>
            {groupedUnits.Knight.map(unit => (
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit] || 'border-red-500'} border border-gray-300 dark:border-gray-700 shadow`}>
                <h3 className="font-bold text-lg mb-2">{unit}</h3>
                <div className="space-y-2">
                  {sortedRealms.filter(realm => {
                    return resourceMatrix[unit]?.[realm.name] > 0;
                  }).map(realm => (
                    <div key={`${unit}-${realm.name}`} className="flex justify-between">
                      <span>{realm.name}:</span>
                      <span className="font-medium">{formatNumber(resourceMatrix[unit]?.[realm.name] || 0)}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatNumber(resourceMatrix[unit]?.total || 0)}</span>
                  </div>
                </div>
              </div>
            ))}
            {groupedUnits.Knight.length === 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow">
                <p className="text-gray-500 dark:text-gray-400 italic">No Knight units found</p>
              </div>
            )}
          </div>
          
          {/* Crossbowmen */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-blue-500">Crossbowmen</h4>
            {groupedUnits.Crossbowman.map(unit => (
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit] || 'border-blue-500'} border border-gray-300 dark:border-gray-700 shadow`}>
                <h3 className="font-bold text-lg mb-2">{unit}</h3>
                <div className="space-y-2">
                  {sortedRealms.filter(realm => {
                    return resourceMatrix[unit]?.[realm.name] > 0;
                  }).map(realm => (
                    <div key={`${unit}-${realm.name}`} className="flex justify-between">
                      <span>{realm.name}:</span>
                      <span className="font-medium">{formatNumber(resourceMatrix[unit]?.[realm.name] || 0)}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatNumber(resourceMatrix[unit]?.total || 0)}</span>
                  </div>
                </div>
              </div>
            ))}
            {groupedUnits.Crossbowman.length === 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow">
                <p className="text-gray-500 dark:text-gray-400 italic">No Crossbowman units found</p>
              </div>
            )}
          </div>
          
          {/* Paladins */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-green-500">Paladins</h4>
            {groupedUnits.Paladin.map(unit => (
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit] || 'border-green-500'} border border-gray-300 dark:border-gray-700 shadow`}>
                <h3 className="font-bold text-lg mb-2">{unit}</h3>
                <div className="space-y-2">
                  {sortedRealms.filter(realm => {
                    return resourceMatrix[unit]?.[realm.name] > 0;
                  }).map(realm => (
                    <div key={`${unit}-${realm.name}`} className="flex justify-between">
                      <span>{realm.name}:</span>
                      <span className="font-medium">{formatNumber(resourceMatrix[unit]?.[realm.name] || 0)}</span>
                    </div>
                  ))}
                  <div className="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{formatNumber(resourceMatrix[unit]?.total || 0)}</span>
                  </div>
                </div>
              </div>
            ))}
            {groupedUnits.Paladin.length === 0 && (
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow">
                <p className="text-gray-500 dark:text-gray-400 italic">No Paladin units found</p>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  // Show a notice when no data is available
  const renderNoDataMessage = () => (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-6 rounded-lg text-center">
      <h3 className="text-lg font-medium text-yellow-800 dark:text-yellow-200 mb-2">No Data Available</h3>
      <p className="text-yellow-700 dark:text-yellow-300">
        Please go to the Data Entry tab to input your game data.
      </p>
      <button
        onClick={() => setActiveTab('data-entry')}
        className="mt-4 px-4 py-2 bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-100 rounded hover:bg-yellow-200 dark:hover:bg-yellow-700"
      >
        Go to Data Entry
      </button>
    </div>
  );

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">Eternum Dashboard</h1>
      <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-4">Your Empire, m'Lord</p>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        Last updated: {new Date(lastUpdated).toLocaleString()}
      </p>
      
      {renderTabHeader()}
      
      {activeTab === 'data-entry' ? (
        renderDataEntry()
      ) : gameData.length === 0 ? (
        renderNoDataMessage()
      ) : (
        <>
          {renderSearch()}
          {activeTab === 'resources' ? renderResourcesTable() : renderMilitaryUnits()}
          
          <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>Showing {searchFilteredResources.length} resources across {sortedRealms.length} realms</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ResourceDashboard;
