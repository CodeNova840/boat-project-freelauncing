// inventoryData.js

 const inventoryCategories = {
  "Boat Models & Packages (IRON Boats)": {
    "647 Models": [
      { code: "647-BOAT/B", name: "647 - IRON Boat in Black", costExGST: 71854.30, rrpExGST: 98177.27, rrpInGST: 107994.99, dealerPriceExGST: 63950.33, dealerMargin: 34226.94 },
      { code: "647-BOAT/G", name: "647 - IRON Boat in Grey", costExGST: 71854.30, rrpExGST: 98177.27, rrpInGST: 107994.99, dealerPriceExGST: 63950.33, dealerMargin: 34226.94 },
      { code: "647-BOAT/W", name: "647 - IRON Boat in White", costExGST: 71854.30, rrpExGST: 98177.27, rrpInGST: 107994.99, dealerPriceExGST: 63950.33, dealerMargin: 34226.94 }
    ],
    "707 Models": [
      { code: "707-BOAT/B", name: "707 - IRON Boat in Black", costExGST: 84504.30, rrpExGST: 118831.82, rrpInGST: 130715.00, dealerPriceExGST: 74363.78, dealerMargin: 44468.04 },
      { code: "707-BOAT/G", name: "707 - IRON Boat in Grey", costExGST: 84504.30, rrpExGST: 118831.82, rrpInGST: 130715.00, dealerPriceExGST: 74363.78, dealerMargin: 44468.04 },
      { code: "707-BOAT/Wh", name: "707 - IRON Boat in White", costExGST: 84504.30, rrpExGST: 118831.82, rrpInGST: 130715.00, dealerPriceExGST: 74363.78, dealerMargin: 44468.04 }
    ],
    "767 Models": [
      { code: "767-BOAT/B", name: "767 - IRON Boat in Black", costExGST: 92081.65, rrpExGST: 139209.09, rrpInGST: 153130.00, dealerPriceExGST: 81031.85, dealerMargin: 58177.24 },
      { code: "767-BOAT/G", name: "767 - IRON Boat in Grey", costExGST: 92081.65, rrpExGST: 139209.09, rrpInGST: 153130.00, dealerPriceExGST: 81031.85, dealerMargin: 58177.24 },
      { code: "767-BOAT/W", name: "767 - IRON Boat in White", costExGST: 92081.65, rrpExGST: 139209.09, rrpInGST: 153130.00, dealerPriceExGST: 81031.85, dealerMargin: 58177.24 }
    ],
    "827 Models": [
      { code: "827-BOAT/B", name: "827 - IRON Boat in Black", costExGST: 101137.90, rrpExGST: 152745.46, rrpInGST: 168020.00, dealerPriceExGST: 87989.97, dealerMargin: 64755.49 },
      { code: "827-BOAT/G", name: "827 - IRON Boat in Grey", costExGST: 101137.90, rrpExGST: 152745.46, rrpInGST: 168020.00, dealerPriceExGST: 87989.97, dealerMargin: 64755.49 },
      { code: "827-BOAT/W", name: "827 - IRON Boat in White", costExGST: 101137.90, rrpExGST: 152745.46, rrpInGST: 168020.00, dealerPriceExGST: 87989.97, dealerMargin: 64755.49 },
      { code: "827 COUPE/B", name: "827 - C - IRON Boat 827 Coupe Black, w bowthruster", costExGST: 117875.00, rrpExGST: 188586.36, rrpInGST: 207445.00, dealerPriceExGST: 102551.25, dealerMargin: 86035.11 },
      { code: "827 COUPE/G", name: "827 - C - IRON Boat 827 Coupe Grey, w bowthruster", costExGST: 117875.00, rrpExGST: 188586.36, rrpInGST: 207445.00, dealerPriceExGST: 102551.25, dealerMargin: 86035.11 },
      { code: "827 COUPE/W", name: "827 - C - IRON Boat 827 Coupe White, w bowthruster", costExGST: 117875.00, rrpExGST: 188586.36, rrpInGST: 207445.00, dealerPriceExGST: 102551.25, dealerMargin: 86035.11 }
    ],
    "907 Models": [
      { code: "907-BOAT/B", name: "907 - IRON Boat in Black", costExGST: 113212.90, rrpExGST: 179568.18, rrpInGST: 197525.00, dealerPriceExGST: 97363.09, dealerMargin: 82205.09 },
      { code: "907-BOAT/G", name: "907 - IRON Boat in Grey", costExGST: 113212.90, rrpExGST: 179568.18, rrpInGST: 197525.00, dealerPriceExGST: 97363.09, dealerMargin: 82205.09 },
      { code: "907-BOAT/W", name: "907 - IRON Boat in White", costExGST: 113212.90, rrpExGST: 179568.18, rrpInGST: 197525.00, dealerPriceExGST: 97363.09, dealerMargin: 82205.09 },
      { code: "907 COUPE/B", name: "907 - C - IRON 907 Coupe in Black, w bowthruster", costExGST: 131900.40, rrpExGST: 205536.36, rrpInGST: 226090.00, dealerPriceExGST: 113434.34, dealerMargin: 92102.02 },
      { code: "907 COUPE/G", name: "907 - C - IRON 907 Coupe in Grey, w bowthruster", costExGST: 131900.40, rrpExGST: 205536.36, rrpInGST: 226090.00, dealerPriceExGST: 113434.34, dealerMargin: 92102.02 },
      { code: "907 COUPE/W", name: "907 - C - IRON 907 Coupe in White, w bowthruster", costExGST: 131900.40, rrpExGST: 205536.36, rrpInGST: 226090.00, dealerPriceExGST: 113434.34, dealerMargin: 92102.02 }
    ]
  },

  "Delivery & Commissioning": {
    "Delivery Costs": [
      { code: "647-DELI", name: "647 - Delivery costs, including 50 litre fuel", costExGST: 517.50, rrpExGST: 631.82, rrpInGST: 695.00, dealerPriceExGST: 465.75, dealerMargin: 166.07 },
      { code: "707-DELI", name: "707 - Delivery costs, including 50 litre fuel", costExGST: 546.25, rrpExGST: 659.10, rrpInGST: 725.00, dealerPriceExGST: 491.63, dealerMargin: 167.47 },
      { code: "767-DELI", name: "767 - Delivery costs, including 100 litre fuel", costExGST: 684.25, rrpExGST: 795.45, rrpInGST: 875.00, dealerPriceExGST: 615.83, dealerMargin: 179.62 },
      { code: "827-DELI", name: "827 - Delivery costs, including 150 litre fuel", costExGST: 718.75, rrpExGST: 813.64, rrpInGST: 895.00, dealerPriceExGST: 646.88, dealerMargin: 166.76 },
      { code: "827- Coupe DELIVERY", name: "827C - Delivery Costs, including 150 litre fuel", costExGST: 789.00, rrpExGST: 904.55, rrpInGST: 995.00, dealerPriceExGST: 810.00, dealerMargin: 94.55 },
      { code: "907-DELI", name: "907 - Delivery Costs, including 150 litre fuel", costExGST: 865.00, rrpExGST: 977.27, rrpInGST: 1075.00, dealerPriceExGST: 880.00, dealerMargin: 97.27 },
      { code: "907-Coupe DELIVERY", name: "907 - Coupe - Delivery Costs, including 150 litre", costExGST: 977.50, rrpExGST: 1086.36, rrpInGST: 1195.00, dealerPriceExGST: 990.00, dealerMargin: 96.36 }
    ],
    "Services & Treatments": [
      { code: "100 - 20 HR", name: "20 HOUR SERVICE", costExGST: 517.50, rrpExGST: 640.00, rrpInGST: 704.00, dealerPriceExGST: 465.75, dealerMargin: 174.25 },
      { code: "647-ANTI", name: "647 - Antifouling", costExGST: 1265.00, rrpExGST: 1540.91, rrpInGST: 1695.00, dealerPriceExGST: 1138.50, dealerMargin: 402.41 },
      { code: "707-ANTI", name: "707 - Antifouling", costExGST: 1357.00, rrpExGST: 1722.73, rrpInGST: 1895.00, dealerPriceExGST: 1221.30, dealerMargin: 501.43 },
      { code: "767-ANTI", name: "767 - Antifouling", costExGST: 1477.75, rrpExGST: 1813.64, rrpInGST: 1995.00, dealerPriceExGST: 1329.98, dealerMargin: 483.66 },
      { code: "827-ANTI", name: "827 - 827 C Antifouling", costExGST: 1552.50, rrpExGST: 1995.45, rrpInGST: 2195.00, dealerPriceExGST: 1397.25, dealerMargin: 598.20 },
      { code: "907 - Antifouling", name: "907 - 907 C Antifouling", costExGST: 1725.00, rrpExGST: 2136.36, rrpInGST: 2350.00, dealerPriceExGST: 1552.50, dealerMargin: 583.86 }
    ]
  },

  "Electronics & Audio": {
    "Chartplotters & Displays": [
      { code: "SIMRAD-Chart", name: "SIMRAD Chartplotter", costExGST: 316.25, rrpExGST: 359.09, rrpInGST: 395.00, dealerPriceExGST: 284.63, dealerMargin: 74.46 },
      { code: "100-SIM-9\"- NSX3009", name: "SIMRAD NSX 3009, 9\"", costExGST: 2015.00, rrpExGST: 2375.00, rrpInGST: 2612.50, dealerPriceExGST: 2135.00, dealerMargin: 240.00 },
      { code: "100-SIM-12\"- NSX3012", name: "SIMRAD NSX 3012, 12\"", costExGST: 3745.00, rrpExGST: 4035.45, rrpInGST: 4439.00, dealerPriceExGST: 3825.00, dealerMargin: 210.45 },
      { code: "100-SIM 3015", name: "SIMRAD NSX 3015 Ultrawide with Active Imaging", costExGST: 5195.00, rrpExGST: 5850.00, rrpInGST: 6435.00, dealerPriceExGST: 5395.00, dealerMargin: 455.00 }
    ],
    "Sensors & Radar": [
      { code: "100-SIMT", name: "SIMRAD Transducer", costExGST: 586.50, rrpExGST: 625.00, rrpInGST: 687.50, dealerPriceExGST: 605.00, dealerMargin: 20.00 },
      { code: "100-SIM-RADAR HALO", name: "SIMRAD RADAR HALO 20+, 827C and 907C", costExGST: 5295.00, rrpExGST: 7500.00, rrpInGST: 8250.00, dealerPriceExGST: 5750.00, dealerMargin: 1750.00 }
    ],
    "Audio Systems": [
      { code: "100-CLA-ST", name: "Clarion Stereo w Bluetooth, 2 Speakers", costExGST: 1320.20, rrpExGST: 1290.00, rrpInGST: 1419.00, dealerPriceExGST: 1320.20, dealerMargin: -30.20 },
      { code: "100-CLARION+AMP", name: "Clarion Stereo w. 4x Speaker w. 300W Amplifier", costExGST: 1785.00, rrpExGST: 2150.00, rrpInGST: 2365.00, dealerPriceExGST: 1895.00, dealerMargin: 255.00 },
      { code: "100-CLA-2SPE", name: "Clarion 2x Additional Marine Speaker", costExGST: 650.00, rrpExGST: 695.00, rrpInGST: 764.50, dealerPriceExGST: 670.00, dealerMargin: 25.00 }
    ]
  },

  "Hull & Deck Equipment": {
    "Anchoring & Mooring": [
      { code: "100-Tow Bow", name: "2x towing Eye Bow", costExGST: 902.50, rrpExGST: 979.00, rrpInGST: 1076.90, dealerPriceExGST: 902.50, dealerMargin: 76.50 },
      { code: "100-Lashing Transom", name: "Lashing Points Transom, 2pcs", costExGST: 265.00, rrpExGST: 325.00, rrpInGST: 357.50, dealerPriceExGST: 282.50, dealerMargin: 42.50 },
      { code: "100, ANCHOR, recessed", name: "Recessed Anchor, 707,767,827,827C,907,907C", costExGST: 6000.00, rrpExGST: 6600.00, rrpInGST: 7260.00, dealerPriceExGST: 6150.00, dealerMargin: 450.00 },
      { code: "647- ANCHOR", name: "647- Anchor winch fitted, 647 only", costExGST: 5645.00, rrpExGST: 6000.00, rrpInGST: 6600.00, dealerPriceExGST: 5795.00, dealerMargin: 205.00 },
      { code: "windlass`", name: "Windlass anchor, Dashboard controlled", costExGST: 6450.00, rrpExGST: 7995.00, rrpInGST: 8794.50, dealerPriceExGST: 7125.00, dealerMargin: 870.00 },
      { code: "100-WINDLASS PREP", name: "Power to the bow (windlass prep)", costExGST: 483.00, rrpExGST: 540.00, rrpInGST: 594.00, dealerPriceExGST: 486.00, dealerMargin: 54.00 }
    ],
    "Steering & Control": [
      { code: "Electric St", name: "Electric Steering Mercury V10 Engines", costExGST: 10925.00, rrpExGST: 11975.00, rrpInGST: 13172.50, dealerPriceExGST: 11000.00, dealerMargin: 975.00 },
      { code: "100-BOWTHRUST", name: "Bowthruster all models, standard with Coupes", costExGST: 5675.00, rrpExGST: 6000.00, rrpInGST: 6600.00, dealerPriceExGST: 5765.00, dealerMargin: 235.00 },
      { code: "647-HYDR", name: "647 - Hydraulic Pump and hoses", costExGST: 1150.00, rrpExGST: 1395.00, rrpInGST: 1534.50, dealerPriceExGST: 1255.50, dealerMargin: 139.50 },
      { code: "707-HYDR", name: "707 - Hydraulic Pump and hoses", costExGST: 1150.00, rrpExGST: 1395.00, rrpInGST: 1534.50, dealerPriceExGST: 1255.50, dealerMargin: 139.50 }
    ]
  },

  "Boating Systems": {
    "Electrical Systems": [
      { code: "Dual Batt", name: "Dual Battery with install", costExGST: 1255.00, rrpExGST: 1350.00, rrpInGST: 1485.00, dealerPriceExGST: 1265.00, dealerMargin: 85.00 }
    ],
    "Plumbing & Appliances": [
      { code: "100-SHOW", name: "Shower Kit complete", costExGST: 1489.25, rrpExGST: 1540.91, rrpInGST: 1695.00, dealerPriceExGST: 1489.25, dealerMargin: 51.66 },
      { code: "100-REFR", name: "Vitrifrido Marine Refrigerator", costExGST: 1685.00, rrpExGST: 1904.55, rrpInGST: 2095.00, dealerPriceExGST: 1773.00, dealerMargin: 131.55 }
    ]
  },

  "Interior & Exterior Comfort": {
    "T-Tops & Sunshades": [
      { code: "100-T TOP", name: "T-top 2025 complete for open boats excluding 907", costExGST: 5795.00, rrpExGST: 6000.00, rrpInGST: 6600.00, dealerPriceExGST: 5865.00, dealerMargin: 135.00 },
      { code: "907-T Top 907", name: "907 T-top 2025 complete, 2ft longer", costExGST: 5850.00, rrpExGST: 6600.00, rrpInGST: 7260.00, dealerPriceExGST: 6000.00, dealerMargin: 600.00 },
      { code: "100-  Sunshade Aft", name: "T-top or Coupes only Sunshade Aft w carbon fibre p", costExGST: 1895.00, rrpExGST: 1995.00, rrpInGST: 2194.50, dealerPriceExGST: 1915.00, dealerMargin: 80.00 },
      { code: "100 - Sunshade Aft", name: "100 - Sunshade Aft with carbon fibre poles", costExGST: 1895.00, rrpExGST: 1995.00, rrpInGST: 2194.50, dealerPriceExGST: 1915.00, dealerMargin: 80.00 },
      { code: "100-  Sunshade Bow", name: "T-top or Coupes only Sunshade Bow w carbon fibre p", costExGST: 1895.00, rrpExGST: 1995.00, rrpInGST: 2194.50, dealerPriceExGST: 1925.00, dealerMargin: 70.00 },
      { code: "100 - Bimini", name: "647 or 707 Powder coated Black Bimini", costExGST: 3162.50, rrpExGST: 3695.00, rrpInGST: 4064.50, dealerPriceExGST: 3486.25, dealerMargin: 208.75 }
    ],
    "Covers & Protection": [
      { code: "200-COVER", name: "Australian made Cover - larger Boats", costExGST: 4695.00, rrpExGST: 5195.00, rrpInGST: 5714.50, dealerPriceExGST: 4695.00, dealerMargin: 500.00 },
      { code: "100- Spray", name: "Centre Console Spray Hood", costExGST: 1725.00, rrpExGST: 1800.00, rrpInGST: 1980.00, dealerPriceExGST: 1725.00, dealerMargin: 75.00 },
      { code: "907-CONSOLE", name: "907 Console Covers", costExGST: 590.00, rrpExGST: 600.00, rrpInGST: 660.00, dealerPriceExGST: 600.00, dealerMargin: 10.00 },
      { code: "100-CONS", name: "Console and back seat covers 707-767-827", costExGST: 575.00, rrpExGST: 600.00, rrpInGST: 660.00, dealerPriceExGST: 586.50, dealerMargin: 13.50 },
      { code: "647-COVER", name: "647 - Console Cover 647 only", costExGST: 545.00, rrpExGST: 650.00, rrpInGST: 715.00, dealerPriceExGST: 585.00, dealerMargin: 65.00 },
      { code: "827 - Boat cover", name: "827 - locally made heavy duty boat cover.", costExGST: 5175.00, rrpExGST: 5850.00, rrpInGST: 6435.00, dealerPriceExGST: 5265.00, dealerMargin: 585.00 }
    ],
    "Flooring & Upholstery": [
      { code: "SEADECK", name: "SEADEK, optional colours", costExGST: 402.50, rrpExGST: 795.00, rrpInGST: 874.50, dealerPriceExGST: 715.50, dealerMargin: 79.50 },
      { code: "647 - Flooring", name: "647 - Sea Deck soft flooring", costExGST: 1495.00, rrpExGST: 1759.09, rrpInGST: 1935.00, dealerPriceExGST: 1615.50, dealerMargin: 143.59 },
      { code: "707 - Flooring", name: "707 - Sea Deck soft flooring", costExGST: 1827.50, rrpExGST: 2031.82, rrpInGST: 2235.00, dealerPriceExGST: 1905.00, dealerMargin: 77.50 },
      { code: "767- Flooring", name: "767 - Sea Deck soft flooring", costExGST: 1802.00, rrpExGST: 2031.82, rrpInGST: 2235.00, dealerPriceExGST: 1850.00, dealerMargin: 48.00 },
      { code: "827 - Flooring", name: "827 - Sea Deck soft flooring", costExGST: 1965.00, rrpExGST: 2222.73, rrpInGST: 2445.00, dealerPriceExGST: 2010.00, dealerMargin: 45.00 },
      { code: "827 Coupe Flooring", name: "827C - Sea Deck soft flooring", costExGST: 1965.00, rrpExGST: 2222.73, rrpInGST: 2445.00, dealerPriceExGST: 2010.00, dealerMargin: 45.00 },
      { code: "907 Flooring", name: "907 - Sea Deck soft flooring", costExGST: 2175.00, rrpExGST: 2413.64, rrpInGST: 2655.00, dealerPriceExGST: 2225.00, dealerMargin: 50.00 },
      { code: "907 Coupe Flooring", name: "907C - Sea Deck soft flooring", costExGST: 2175.00, rrpExGST: 2413.64, rrpInGST: 2655.00, dealerPriceExGST: 2225.00, dealerMargin: 50.00 },
      { code: "100-Sunbed Aft", name: "Sunbed Aft for 707, 767, 827, 907", costExGST: 885.50, rrpExGST: 1149.00, rrpInGST: 1263.90, dealerPriceExGST: 1034.10, dealerMargin: 114.90 },
      { code: "100-TABL", name: "Table Twin alu posts, cup holders", costExGST: 776.25, rrpExGST: 1177.27, rrpInGST: 1295.00, dealerPriceExGST: 1089.53, dealerMargin: 87.74 }
    ]
  },

  "Fishing & Deck Accessories": {
    "Mounting Systems": [
      { code: "100-RAM-RAP816U", name: "RAM 16\" tough track", costExGST: 16.10, rrpExGST: 28.95, rrpInGST: 31.85, dealerPriceExGST: 26.06, dealerMargin: 2.89 },
      { code: "100-RAM-RAP421", name: "RAM Track Base", costExGST: 20.13, rrpExGST: 34.95, rrpInGST: 38.45, dealerPriceExGST: 25.00, dealerMargin: 9.95 }
    ],
    "Fishing Gear": [
      { code: "100-RAM-114NBU", name: "RAM Rod holder", costExGST: 29.90, rrpExGST: 49.95, rrpInGST: 54.95, dealerPriceExGST: 44.96, dealerMargin: 4.99 },
      { code: "100-RAM-RAP395PU", name: "RAM Bait Board", costExGST: 57.50, rrpExGST: 89.95, rrpInGST: 98.95, dealerPriceExGST: 80.96, dealerMargin: 8.99 },
      { code: "100 Fish-RAM", name: "RAM Fishing: 4xRodholder, 1xBaitboard, Installed", costExGST: 460.00, rrpExGST: 1195.00, rrpInGST: 1314.50, dealerPriceExGST: 1075.50, dealerMargin: 119.50 }
    ]
  },

  "Propulsion & Engine Packages": {
    "Mercury V6 Engines": [
      { code: "MERC-150 HP", name: "Mercury 150HP XS", costExGST: 18091.00, rrpExGST: 20804.55, rrpInGST: 22885.00, dealerPriceExGST: 19763.82, dealerMargin: 1040.73 },
      { code: "MERC-150 PRO XS", name: "Mercury, 150HP PRO XS, Active trim", costExGST: 19057.00, rrpExGST: 21915.45, rrpInGST: 24107.00, dealerPriceExGST: 20804.15, dealerMargin: 1111.30 },
      { code: "MERC-200HP-V6-DTS", name: "Mercury V6 - 200HP, dts", costExGST: 23211.00, rrpExGST: 26692.73, rrpInGST: 29362.00, dealerPriceExGST: 25348.00, dealerMargin: 1344.73 },
      { code: "MERC-225HP-V6-DTS", name: "Mercury V6 - 225HP, DTS", costExGST: 25348.00, rrpExGST: 28750.00, rrpInGST: 31625.00, dealerPriceExGST: 27310.60, dealerMargin: 1440.00 },
      { code: "MERC-250HP-V6", name: "Mercury V6, with Active Trim - 250HP", costExGST: 28886.00, rrpExGST: 33218.90, rrpInGST: 36540.79, dealerPriceExGST: 30441.70, dealerMargin: 2772.90 }
    ],
    "Mercury V8 Engines": [
      { code: "MERC- V8 - 200HP - Pro XS", name: "Mercury V8 -200HP - Pro XS", costExGST: 24799.00, rrpExGST: 28519.10, rrpInGST: 31371.01, dealerPriceExGST: 26559.05, dealerMargin: 1960.05 },
      { code: "Merc-225HP-V8-Pro XS", name: "Mercury V8 - 225HP, Pro XS", costExGST: 28500.00, rrpExGST: 32775.45, rrpInGST: 36053.00, dealerPriceExGST: 30037.50, dealerMargin: 2737.95 },
      { code: "MERC-V8-250HP PRO XS", name: "Mercury V8 PRO XS - 250HP", costExGST: 29847.00, rrpExGST: 34323.64, rrpInGST: 37756.00, dealerPriceExGST: 31339.35, dealerMargin: 2983.29 },
      { code: "MERC-V8-250HP Verado", name: "Mercury V8 Verado 250HP", costExGST: 30519.00, rrpExGST: 35097.27, rrpInGST: 38607.00, dealerPriceExGST: 31993.05, dealerMargin: 3104.22 },
      { code: "MERC-300HP-V8 Pro XS", name: "Mercury V8 - 300HP Pro XS, Active Trim", costExGST: 31658.00, rrpExGST: 36406.70, rrpInGST: 40047.37, dealerPriceExGST: 33075.10, dealerMargin: 3331.60 },
      { code: "MERC-V8-300HP Verado", name: "Mercury V8 Verado 300HP for 767 and 827", costExGST: 33311.00, rrpExGST: 38307.27, rrpInGST: 42138.00, dealerPriceExGST: 34745.45, dealerMargin: 3561.82 },
      { code: "MERC 300 XL", name: "Mercury V8 - 300HP XL Active Trim", costExGST: 31369.00, rrpExGST: 36406.70, rrpInGST: 40047.37, dealerPriceExGST: 32800.55, dealerMargin: 3606.15 },
      { code: "MERC-V8-450 Racing", name: "Mercury V8-450HP Racing", costExGST: 65000.00, rrpExGST: 74750.00, rrpInGST: 82225.00, dealerPriceExGST: 67950.00, dealerMargin: 6800.00 },
      { code: "MERC-V8-500 Racing", name: "Mercury V8 - 500HP Racing", costExGST: 75650.00, rrpExGST: 86997.27, rrpInGST: 95697.00, dealerPriceExGST: 79104.50, dealerMargin: 7892.77 }
    ],
    "Mercury V10 Engines": [
      { code: "MERC-V10-350HP Verado", name: "Mercury V10 Verado 350 HP", costExGST: 37469.00, rrpExGST: 44735.45, rrpInGST: 49209.00, dealerPriceExGST: 39155.55, dealerMargin: 5580.00 },
      { code: "MERC-V10-400HP Verado", name: "Mercury V10 Verado 400HP", costExGST: 40447.00, rrpExGST: 48185.45, rrpInGST: 53004.00, dealerPriceExGST: 42274.65, dealerMargin: 5910.80 },
      { code: "MERC-V10-400HP Racing", name: "Mercury V10-400HP Racing", costExGST: 45650.00, rrpExGST: 55251.82, rrpInGST: 60777.00, dealerPriceExGST: 47717.50, dealerMargin: 7534.32 }
    ],
    "Rigging Kits": [
      { code: "Rigging V6", name: "Mercury Rigging V6", costExGST: 6727.00, rrpExGST: 7595.00, rrpInGST: 8354.50, dealerPriceExGST: 7210.65, dealerMargin: 384.35 },
      { code: "Rigging V8-200 and 250HP", name: "Mercury V8 200 and 250 HP, complete install", costExGST: 6727.00, rrpExGST: 7595.00, rrpInGST: 8354.50, dealerPriceExGST: 7210.65, dealerMargin: 384.35 },
      { code: "Rigging V8 Verado", name: "Mercury Verado V8 250 300HP complete install", costExGST: 7455.00, rrpExGST: 8950.00, rrpInGST: 9845.00, dealerPriceExGST: 7982.25, dealerMargin: 967.75 },
      { code: "Rigging V8 450R Verado", name: "Mercury Verado V8 450R complete install", costExGST: 8625.00, rrpExGST: 10995.00, rrpInGST: 12094.50, dealerPriceExGST: 9626.25, dealerMargin: 1368.75 },
      { code: "Rigging V10 Verado", name: "Mercury Rigging V10", costExGST: 8900.00, rrpExGST: 9650.00, rrpInGST: 10615.00, dealerPriceExGST: 9315.00, dealerMargin: 335.00 }
    ]
  }
};
export default inventoryCategories;
// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = inventoryCategories;
}