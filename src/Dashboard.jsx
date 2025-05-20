import React, { useState, useMemo } from 'react';
import MilitaryUnitsSummary from './components/MilitaryUnitsSummary';
// Import gameData from Dashboard.jsx directly since it's defined here

// This would normally be fetched from an API
const gameData = [
  {
    "entityId": 763,
    "name": "Nutnutnutnil",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 1500,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 1652,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Wood",
        "totalAmount": 2750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 100001,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ironwood",
        "totalAmount": 124970,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 65832,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Silver",
        "totalAmount": 94826,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Diamonds",
        "totalAmount": 51551,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Hartwood",
        "totalAmount": 29430,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Sapphire",
        "totalAmount": 13723,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 1684,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Crossbowman",
        "totalAmount": 2781,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 634,
    "name": "it-Pus",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 81992,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 157250,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Wood",
        "totalAmount": 73608,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 46930,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ironwood",
        "totalAmount": 743,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 79673,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Gold",
        "totalAmount": 4,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ruby",
        "totalAmount": 4128,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Diamonds",
        "totalAmount": 105160,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Hartwood",
        "totalAmount": 98804,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ignium",
        "totalAmount": 14777,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 84,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 2593,
    "name": "Ukum Säl",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 100002,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 36574,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 36978,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 89345,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ignium",
        "totalAmount": 4966,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 1031,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Crossbowman",
        "totalAmount": 1000,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 715,
    "name": "Nangpen",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 3000,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 2250,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Wood",
        "totalAmount": 3750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Silver",
        "totalAmount": 2250,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ruby",
        "totalAmount": 91671,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Diamonds",
        "totalAmount": 4715,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Sapphire",
        "totalAmount": 111407,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 344,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 2599,
    "name": "Lismáksisté",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 1500,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 3000,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Wood",
        "totalAmount": 1500,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 2250,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Ironwood",
        "totalAmount": 52985,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 3000,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Gold",
        "totalAmount": 13424,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Silver",
        "totalAmount": 3000,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Diamonds",
        "totalAmount": 750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Sapphire",
        "totalAmount": 750,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 2540,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "KnightT2",
        "totalAmount": 500,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Paladin",
        "totalAmount": 100,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "PaladinT2",
        "totalAmount": 250,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 691,
    "name": "Oolusoolip",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 33238,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 7277,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Wood",
        "totalAmount": 53104,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 85933,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 205004,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 1144,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 709,
    "name": "Chozhdukzhor",
    "resources": [
      {
        "name": "Gold",
        "totalAmount": 266094,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Hartwood",
        "totalAmount": 12548,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 1154,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 643,
    "name": "Kokmrukmom",
    "resources": [
      {
        "name": "Stone",
        "totalAmount": 21881,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Coal",
        "totalAmount": 852,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Copper",
        "totalAmount": 50855,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Obsidian",
        "totalAmount": 1,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Gold",
        "totalAmount": 28117,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Silver",
        "totalAmount": 52143,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Donkey",
        "totalAmount": 1157,
        "hasReachedMaxCapacity": false
      },
      {
        "name": "Paladin",
        "totalAmount": 2935,
        "hasReachedMaxCapacity": false
      }
    ]
  },
  {
    "entityId": 3489,
    "name": "pu-Muhmuh",
    "resources": [
      {
        "name": "Donkey",
        "totalAmount": 1364,
        "hasReachedMaxCapacity": false
      }
    ]
  }
];
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
  return [
    "Knight", "KnightT2", "KnightT3",
    "Crossbowman", "CrossbowmanT2", "CrossbowmanT3",
    "Paladin", "PaladinT2", "PaladinT3"
  ].includes(resourceName);
};

const ResourceDashboard = () => {
  const [activeTab, setActiveTab] = useState('resources'); // Default to Resources View
  const [sortConfig, setSortConfig] = useState({
    key: 'realmNumber',
    direction: 'ascending'
  });
  const [resourceFilter, setResourceFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Get all realms from gameData
  const allRealms = useMemo(() => {
    return gameData.map(realm => ({
      entityId: realm.entityId,
      name: realm.name
    }));
  }, []);

  // Sort realms alphabetically by name
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
  }, []);

  // Sort resources according to the defined order
  const sortedResources = useMemo(() => {
    return [...allResources].sort((a, b) => {
      const aIndex = resourceOrder.indexOf(a);
      const bIndex = resourceOrder.indexOf(b);
      
      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      } else if (aIndex !== -1) {
        return -1;
      } else if (bIndex !== -1) {
        return 1;
      } else {
        return a.localeCompare(b);
      }
    });
  }, [allResources]);

  // Get military units
  const militaryUnits = useMemo(() => {
    return sortedResources.filter(r => isMilitaryUnit(r));
  }, [sortedResources]);

  // Get economic resources
  const economicResources = useMemo(() => {
    // Filter out military units
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

  // Create a data matrix for the flipped table - THIS IS THE KEY FIX
  const resourceMatrix = useMemo(() => {
    // For each resource, collect values from all realms
    const matrix = {};
    
    // We need to process ALL resources, not just filtered ones,
    // because the military view needs access to military resources
    sortedResources.forEach(resource => {
      matrix[resource] = {};
      
      sortedRealms.forEach(realm => {
        const resourceData = gameData
          .find(r => r.entityId === realm.entityId)?.resources
          .find(r => r.name === resource);
        matrix[resource][realm.name] = resourceData ? resourceData.totalAmount : 0;
      });
      
      // Add total for this resource
      matrix[resource].total = Object.values(matrix[resource]).reduce((sum, val) => sum + val, 0);
    });
    
    return matrix;
  }, [sortedResources, sortedRealms]);

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
    let resources = [...searchFilteredResources];
    
    if (sortConfig.key === 'resource') {
      resources.sort((a, b) => {
        const aIndex = resourceOrder.indexOf(a);
        const bIndex = resourceOrder.indexOf(b);
        
        if (aIndex !== -1 && bIndex !== -1) {
          return sortConfig.direction === 'ascending' 
            ? aIndex - bIndex 
            : bIndex - aIndex;
        } else if (aIndex !== -1) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        } else if (bIndex !== -1) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        } else {
          return sortConfig.direction === 'ascending' 
            ? a.localeCompare(b) 
            : b.localeCompare(a);
        }
      });
    } else if (sortConfig.key === 'total') {
      resources.sort((a, b) => {
        const aTotal = resourceMatrix[a]?.total || 0;
        const bTotal = resourceMatrix[b]?.total || 0;
        return sortConfig.direction === 'ascending' 
          ? aTotal - bTotal 
          : bTotal - aTotal;
      });
    } else {
      // Sorting by a specific realm column
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
        className={`py-2 px-4 ${activeTab === 'resources' 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        onClick={() => setActiveTab('resources')}
      >
        Resources View
      </button>
      <button 
        className={`py-2 px-4 ${activeTab === 'military' 
          ? 'text-blue-500 border-b-2 border-blue-500 font-medium' 
          : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
        onClick={() => setActiveTab('military')}
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

  const renderResourcesTable = () => (
    <div className="overflow-x-auto">
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
        {/* Military Units Summary Component */}
        <MilitaryUnitsSummary />
        
        {/* Military Units Table */}
        <div className="overflow-x-auto mb-8">
          <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Unit Type</th>
                {sortedRealms.map(realm => (
                  <th key={realm.entityId} className="px-4 py-2 text-right">
                    {realm.name}
                  </th>
                ))}
                <th className="px-4 py-2 text-right font-bold">Total</th>
              </tr>
            </thead>
            <tbody>
              {militaryUnits.map((unit, index) => {
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
                    <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium">
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
              })}
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
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit]} border border-gray-300 dark:border-gray-700 shadow`}>
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
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit]} border border-gray-300 dark:border-gray-700 shadow`}>
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
              <div key={unit} className={`bg-white dark:bg-gray-800 p-4 rounded-lg border-l-4 ${unitColors[unit]} border border-gray-300 dark:border-gray-700 shadow`}>
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

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-4">Realm Resources Dashboard</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4">Last updated: {new Date().toLocaleString()}</p>
      
      {renderTabHeader()}
      {renderSearch()}
      
      {activeTab === 'resources' ? renderResourcesTable() : renderMilitaryUnits()}
      
      <div className="mt-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Showing {searchFilteredResources.length} resources across {sortedRealms.length} realms</p>
      </div>
    </div>
  );
};

export default ResourceDashboard;
