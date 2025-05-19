import React, { useMemo } from 'react';

/**
 * A component that displays a summary of military units organized by type and tier.
 * Shows totals for each unit type and tier combination.
 */
const MilitaryUnitsSummary = ({ gameData }) => {
  // Calculate totals for each unit type and tier
  const militarySummary = useMemo(() => {
    // Initialize with dynamic unit types
    const unitTypes = [...new Set(
      gameData.flatMap(realm => 
        realm.resources
          .filter(r => r.name.includes('Knight') || r.name.includes('Crossbowman') || r.name.includes('Paladin'))
          .map(r => {
            if (r.name.includes('Knight')) return 'Knight';
            if (r.name.includes('Crossbowman')) return 'Crossbowman';
            if (r.name.includes('Paladin')) return 'Paladin';
            return null;
          })
      ).filter(Boolean)
    )];
    
    // Create summary structure
    const summary = {
      totals: { T1: 0, T2: 0, T3: 0, grandTotal: 0 }
    };
    
    // Initialize unit types
    unitTypes.forEach(type => {
      summary[type] = { T1: 0, T2: 0, T3: 0, total: 0 };
    });
    
    // Process all resources
    gameData.forEach(realm => {
      realm.resources.forEach(resource => {
        // Process Knights
        if (resource.name === "Knight") {
          if (!summary.Knight) summary.Knight = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Knight.T1 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "KnightT2") {
          if (!summary.Knight) summary.Knight = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Knight.T2 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "KnightT3") {
          if (!summary.Knight) summary.Knight = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Knight.T3 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T3 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } 
        // Process Crossbowmen
        else if (resource.name === "Crossbowman") {
          if (!summary.Crossbowman) summary.Crossbowman = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Crossbowman.T1 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "CrossbowmanT2") {
          if (!summary.Crossbowman) summary.Crossbowman = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Crossbowman.T2 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "CrossbowmanT3") {
          if (!summary.Crossbowman) summary.Crossbowman = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Crossbowman.T3 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T3 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } 
        // Process Paladins
        else if (resource.name === "Paladin") {
          if (!summary.Paladin) summary.Paladin = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Paladin.T1 += resource.totalAmount;
          summary.Paladin.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "PaladinT2") {
          if (!summary.Paladin) summary.Paladin = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Paladin.T2 += resource.totalAmount;
          summary.Paladin.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "PaladinT3") {
          if (!summary.Paladin) summary.Paladin = { T1: 0, T2: 0, T3: 0, total: 0 };
          summary.Paladin.T3 += resource.totalAmount;
          summary.Paladin.total += resource.totalAmount;
          summary.totals.T3 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        }
      });
    });
    
    return summary;
  }, [gameData]);
  
  // Helper function to format numbers with commas
  const formatNumber = num => {
    return num.toLocaleString();
  };
  
  // Get unit types (excluding 'totals')
  const unitTypes = Object.keys(militarySummary).filter(key => key !== 'totals');
  
  if (unitTypes.length === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Military Units Summary</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700 shadow">
          <p className="text-gray-500 dark:text-gray-400 italic">No military units found in the data</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">Military Units Summary</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Unit Type</th>
              <th className="px-4 py-2 text-right">Tier 1</th>
              <th className="px-4 py-2 text-right">Tier 2</th>
              <th className="px-4 py-2 text-right">Tier 3</th>
              <th className="px-4 py-2 text-right font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            {unitTypes.map((unitType, index) => (
              <tr 
                key={unitType}
                className={`${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'} hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors`}
              >
                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium">{unitType}</td>
                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                  {formatNumber(militarySummary[unitType]?.T1 || 0)}
                </td>
                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                  {formatNumber(militarySummary[unitType]?.T2 || 0)}
                </td>
                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                  {formatNumber(militarySummary[unitType]?.T3 || 0)}
                </td>
                <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                  {formatNumber(militarySummary[unitType]?.total || 0)}
                </td>
              </tr>
            ))}
            <tr className="bg-gray-200 dark:bg-gray-600 font-bold">
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500">TOTAL</td>
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500 text-right">
                {formatNumber(militarySummary.totals.T1)}
              </td>
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500 text-right">
                {formatNumber(militarySummary.totals.T2)}
              </td>
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500 text-right">
                {formatNumber(militarySummary.totals.T3)}
              </td>
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500 text-right">
                {formatNumber(militarySummary.totals.grandTotal)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilitaryUnitsSummary;

