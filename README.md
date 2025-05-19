Eternum Dashboard

Your Empire, m'Lord

A tool for monitoring your Eternum realms, resources, and military units. This dashboard provides a comprehensive view of your entire empire at a glance.

Overview

The Eternum Dashboard allows you to:

    View and analyze the distribution of resources across all your realms
    Track military strength with detailed unit statistics
    Compare realm productivity and resource allocation
    Make informed strategic decisions based on comprehensive data

Features
📊 Data Entry

    Paste your realm data in JSON format
    Automatic validation and error reporting
    Sample data template available for reference

🏆 Resource Analysis

    Complete overview of all resources in your realms
    Sort by resource type, realm, or total quantities
    Search functionality for finding specific resources
    Dynamic tables that adjust to your data

⚔️ Military Management

    Summary of all military units by type and tier
    Detailed breakdown of units by realm
    Visual cards for unit type comparison
    Color-coded unit categories for easy identification

🛡️ Strategic Tools

    Identify resource imbalances across realms
    Spot military vulnerabilities
    Track high-value resources

Getting Started

    Visit the dashboard URL
    Go to the Data Entry tab
    Paste your realm JSON data
    Click "Load Data" to visualize your empire
    Navigate between tabs to explore different views

Data Format

Your JSON data should follow this structure:

json

[
  {
    "entityId": 1,
    "name": "Realm Name",
    "resources": [
      {
        "name": "ResourceName",
        "totalAmount": 1000
      }
    ]
  }
]

Tips for Use

    Regular Updates: Keep your data current for accurate analysis
    Military Balance: Compare unit types across realms to ensure balanced defenses
    Resource Allocation: Use the dashboard to identify which realms should focus on which resources
    Strategic Planning: Make data-driven decisions about where to allocate labor and resources

Feedback and Contributions

Feedback, bug reports, and suggestions are welcome! Feel free to open an issue or contribute to the project.

Built with React and Tailwind CSS • Deployed on Vercel
