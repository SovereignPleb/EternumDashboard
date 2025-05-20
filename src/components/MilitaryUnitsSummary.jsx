import React, { useMemo } from 'react';

/**
 * A component that displays a summary of military units organized by type and tier.
 * Shows totals for each unit type and tier combination.
 * @param {Object} props - Component props
 * @param {Array} props.gameData - Array of realm data objects
 */
const MilitaryUnitsSummary = ({ gameData = [] }) => {
  // Calculate totals for each unit type and tier
  const militarySummary = useMemo(() => {
    const summary = {
      Knight: { T1: 0, T2: 0, T3: 0, total: 0 },
      Crossbowman: { T1: 0, T2: 0, T3: 0, total: 0 },
      Paladin: { T1: 0, T2: 0, T3: 0, total: 0 },
      totals: { T1: 0, T2: 0, T3: 0, grandTotal: 0 }
    };
    
    // Handle case where gameData is undefined or empty
    if (!gameData || gameData.length === 0) {
      return summary;
    }
    
    gameData.forEach(realm => {
      if (!realm.resources) return;
      
      realm.resources.forEach(resource => {
        // Process Knights
        if (resource.name === "Knight") {
          summary.Knight.T1 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "KnightT2") {
          summary.Knight.T2 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "KnightT3") {
          summary.Knight.T3 += resource.totalAmount;
          summary.Knight.total += resource.totalAmount;
          summary.totals.T3 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } 
        // Process Crossbowmen
        else if (resource.name === "Crossbowman") {
          summary.Crossbowman.T1 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "CrossbowmanT2") {
          summary.Crossbowman.T2 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "CrossbowmanT3") {
          summary.Crossbowman.T3 += resource.totalAmount;
          summary.Crossbowman.total += resource.totalAmount;
          summary.totals.T3 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } 
        // Process Paladins
        else if (resource.name === "Paladin") {
          summary.Paladin.T1 += resource.totalAmount;
          summary.Paladin.total += resource.totalAmount;
          summary.totals.T1 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "PaladinT2") {
          summary.Paladin.T2 += resource.totalAmount;
          summary.Paladin.total += resource.totalAmount;
          summary.totals.T2 += resource.totalAmount;
          summary.totals.grandTotal += resource.totalAmount;
        } else if (resource.name === "PaladinT3") {
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
  
  // If there's no military data at all, show a simple message
  if (militarySummary.totals.grandTotal === 0) {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-3">Military Units Summary</h2>
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-300 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400">No military units found in the current data.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-3">Military Units Summary</h2>
      <div className="overflow-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 text-left sticky left-0 top-0 bg-gray-100 dark:bg-gray-700 z-20">Unit Type</th>
              <th className="px-4 py-2 text-right">Tier 1</th>
              <th className="px-4 py-2 text-right">Tier 2</th>
              <th className="px-4 py-2 text-right">Tier 3</th>
              <th className="px-4 py-2 text-right font-bold">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium sticky left-0 bg-inherit z-10">Knight</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Knight.T1)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Knight.T2)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Knight.T3)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                {formatNumber(militarySummary.Knight.total)}
              </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium sticky left-0 bg-inherit z-10">Crossbowman</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Crossbowman.T1)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Crossbowman.T2)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Crossbowman.T3)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                {formatNumber(militarySummary.Crossbowman.total)}
              </td>
            </tr>
            <tr className="bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 font-medium sticky left-0 bg-inherit z-10">Paladin</td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Paladin.T1)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Paladin.T2)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right">
                {formatNumber(militarySummary.Paladin.T3)}
              </td>
              <td className="px-4 py-2 border-t border-gray-200 dark:border-gray-700 text-right font-bold">
                {formatNumber(militarySummary.Paladin.total)}
              </td>
            </tr>
            <tr className="bg-gray-200 dark:bg-gray-600 font-bold">
              <td className="px-4 py-2 border-t border-gray-300 dark:border-gray-500 sticky left-0 bg-gray-200 dark:bg-gray-600 z-10">TOTAL</td>
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
