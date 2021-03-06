var testdata = [
    {"date":2000,"industry":"Wholesale and Retail Trade","unemployed":1000},
    {"date":2000,"industry":"Manufacturing","unemployed":780},
    {"date":2000,"industry":"Leisure and hospitality","unemployed":730},
    {"date":2000,"industry":"Wholesale and Retail Trade","unemployed":1200},
    {"date":2000,"industry":"Manufacturing","unemployed":750},
    {"date":2000,"industry":"Leisure and hospitality","unemployed":700},
    {"date":2000,"industry":"Wholesale and Retail Trade","unemployed":1200},
    {"date":2000,"industry":"Manufacturing","unemployed":700},
    {"date":2000,"industry":"Leisure and hospitality","unemployed":680}
]

var mydata = [
    {"Year":1960,"Kontinent_EN":"Afrika","Refugees":600000},
    {"Year":1961,"Kontinent_EN":"Afrika","Refugees":1360000},
    {"Year":1962,"Kontinent_EN":"Afrika","Refugees":1440000},
    {"Year":1963,"Kontinent_EN":"Afrika","Refugees":1603000},
    {"Year":1964,"Kontinent_EN":"Afrika","Refugees":2251800},
    {"Year":1964,"Kontinent_EN":"Asien","Refugees":4830680},
    {"Year":1964,"Kontinent_EN":"Europa","Refugees":780},
    {"Year":1965,"Kontinent_EN":"Afrika","Refugees":2724860},
    {"Year":1965,"Kontinent_EN":"Asien","Refugees":5365000},
    {"Year":1965,"Kontinent_EN":"Europa","Refugees":119380}
]


var myStackedData = 
    [
        {
            "Year": 1960,
            "Afrika": 600000.0,
            "Amerika": 0.0,
            "Asien": 0.0,
            "Europa": 0.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1961,
            "Afrika": 1360000.0,
            "Amerika": 0.0,
            "Asien": 0.0,
            "Europa": 0.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1962,
            "Afrika": 1440000.0,
            "Amerika": 0.0,
            "Asien": 0.0,
            "Europa": 0.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1963,
            "Afrika": 1603000.0,
            "Amerika": 0.0,
            "Asien": 0.0,
            "Europa": 0.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1964,
            "Afrika": 2251800.0,
            "Amerika": 0.0,
            "Asien": 4830680.0,
            "Europa": 780.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1965,
            "Afrika": 2724860.0,
            "Amerika": 0.0,
            "Asien": 5365000.0,
            "Europa": 119380.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1966,
            "Afrika": 3450720.0,
            "Amerika": 0.0,
            "Asien": 5358240.0,
            "Europa": 138260.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1967,
            "Afrika": 3848310.0,
            "Amerika": 0.0,
            "Asien": 356000.0,
            "Europa": 146230.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1968,
            "Afrika": 4568280.0,
            "Amerika": 0.0,
            "Asien": 366300.0,
            "Europa": 137810.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1969,
            "Afrika": 4331450.0,
            "Amerika": 58000.0,
            "Asien": 346300.0,
            "Europa": 138280.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1970,
            "Afrika": 4456800.0,
            "Amerika": 72400.0,
            "Asien": 324800.0,
            "Europa": 143040.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1971,
            "Afrika": 4455420.0,
            "Amerika": 237720.0,
            "Asien": 467280.0,
            "Europa": 15710.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1972,
            "Afrika": 4891260.0,
            "Amerika": 83200.0,
            "Asien": 496100.0,
            "Europa": 48180.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1973,
            "Afrika": 4328090.0,
            "Amerika": 0.0,
            "Asien": 105000.0,
            "Europa": 41100.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1974,
            "Afrika": 4705460.0,
            "Amerika": 99750.0,
            "Asien": 0.0,
            "Europa": 8020.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1975,
            "Afrika": 6835090.0,
            "Amerika": 79960.0,
            "Asien": 229350.0,
            "Europa": 7250.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1976,
            "Afrika": 7918220.0,
            "Amerika": 19390.0,
            "Asien": 267760.0,
            "Europa": 5030.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1977,
            "Afrika": 9183665.0,
            "Amerika": 15000.0,
            "Asien": 781940.0,
            "Europa": 12100.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1978,
            "Afrika": 10376910.0,
            "Amerika": 741050.0,
            "Asien": 2064010.0,
            "Europa": 22840.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1979,
            "Afrika": 13385290.0,
            "Amerika": 126090.0,
            "Asien": 4739780.0,
            "Europa": 6930.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1980,
            "Afrika": 18098281.0,
            "Amerika": 497215.0,
            "Asien": 11117344.0,
            "Europa": 62295.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1981,
            "Afrika": 13828209.0,
            "Amerika": 1587325.0,
            "Asien": 21624128.0,
            "Europa": 65124.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1982,
            "Afrika": 13362576.0,
            "Amerika": 1533655.0,
            "Asien": 24954710.0,
            "Europa": 69169.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1983,
            "Afrika": 13127190.0,
            "Amerika": 1583545.0,
            "Asien": 26113484.0,
            "Europa": 71356.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1984,
            "Afrika": 15960879.0,
            "Amerika": 1665499.0,
            "Asien": 24572261.0,
            "Europa": 70884.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1985,
            "Afrika": 17042738.0,
            "Amerika": 1476794.0,
            "Asien": 27840467.0,
            "Europa": 78180.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1986,
            "Afrika": 15915582.0,
            "Amerika": 1497334.0,
            "Asien": 30410628.0,
            "Europa": 58662.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1987,
            "Afrika": 17021349.0,
            "Amerika": 1483099.0,
            "Asien": 31688563.0,
            "Europa": 57939.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1988,
            "Afrika": 19288451.0,
            "Amerika": 1571738.0,
            "Asien": 33705877.0,
            "Europa": 364195.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1989,
            "Afrika": 20290145.0,
            "Amerika": 1000528.0,
            "Asien": 33796193.0,
            "Europa": 595924.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1990,
            "Afrika": 25598353.0,
            "Amerika": 837090.0,
            "Asien": 40965653.0,
            "Europa": 856562.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1991,
            "Afrika": 22619602.0,
            "Amerika": 853046.0,
            "Asien": 42418045.0,
            "Europa": 1046813.0,
            "Ozeanien": 0.0
        },
        {
            "Year": 1992,
            "Afrika": 23654434.0,
            "Amerika": 837093.0,
            "Asien": 37266505.0,
            "Europa": 3201140.0,
            "Ozeanien": 95.0
        },
        {
            "Year": 1993,
            "Afrika": 29166214.0,
            "Amerika": 754396.0,
            "Asien": 28619970.0,
            "Europa": 3845713.0,
            "Ozeanien": 445.0
        },
        {
            "Year": 1994,
            "Afrika": 33278289.0,
            "Amerika": 804869.0,
            "Asien": 25320186.0,
            "Europa": 4251424.0,
            "Ozeanien": 780.0
        },
        {
            "Year": 1995,
            "Afrika": 28203147.0,
            "Amerika": 734753.0,
            "Asien": 24238184.0,
            "Europa": 4652721.0,
            "Ozeanien": 11305.0
        },
        {
            "Year": 1996,
            "Afrika": 22034464.0,
            "Amerika": 700599.0,
            "Asien": 25343037.0,
            "Europa": 5440422.0,
            "Ozeanien": 11775.0
        },
        {
            "Year": 1997,
            "Afrika": 17852858.0,
            "Amerika": 655704.0,
            "Asien": 25028887.0,
            "Europa": 5168790.0,
            "Ozeanien": 5880.0
        },
        {
            "Year": 1998,
            "Afrika": 17295644.0,
            "Amerika": 585113.0,
            "Asien": 24420455.0,
            "Europa": 4342518.0,
            "Ozeanien": 2780.0
        },
        {
            "Year": 1999,
            "Afrika": 18382033.0,
            "Amerika": 517952.0,
            "Asien": 24042013.0,
            "Europa": 3874389.0,
            "Ozeanien": 1890.0
        },
        {
            "Year": 2000,
            "Afrika": 19098813.0,
            "Amerika": 382131.0,
            "Asien": 27206835.0,
            "Europa": 3547351.0,
            "Ozeanien": 2280.0
        },
        {
            "Year": 2001,
            "Afrika": 17625281.0,
            "Amerika": 392978.0,
            "Asien": 29295446.0,
            "Europa": 3324490.0,
            "Ozeanien": 3920.0
        },
        {
            "Year": 2002,
            "Afrika": 18051809.0,
            "Amerika": 443546.0,
            "Asien": 23245444.0,
            "Europa": 5034133.0,
            "Ozeanien": 5795.0
        },
        {
            "Year": 2003,
            "Afrika": 17406757.0,
            "Amerika": 426810.0,
            "Asien": 20247812.0,
            "Europa": 4489633.0,
            "Ozeanien": 6060.0
        },
        {
            "Year": 2004,
            "Afrika": 17176132.0,
            "Amerika": 450855.0,
            "Asien": 21233493.0,
            "Europa": 3980038.0,
            "Ozeanien": 7056.0
        },
        {
            "Year": 2005,
            "Afrika": 16077780.0,
            "Amerika": 552730.0,
            "Asien": 19617114.0,
            "Europa": 3218654.0,
            "Ozeanien": 7531.0
        },
        {
            "Year": 2006,
            "Afrika": 15665543.0,
            "Amerika": 762170.0,
            "Asien": 24769987.0,
            "Europa": 3743340.0,
            "Ozeanien": 9269.0
        },
        {
            "Year": 2007,
            "Afrika": 14229002.0,
            "Amerika": 3096917.0,
            "Asien": 33182559.0,
            "Europa": 2806942.0,
            "Ozeanien": 10106.0
        },
        {
            "Year": 2008,
            "Afrika": 13451336.0,
            "Amerika": 2203477.0,
            "Asien": 30107686.0,
            "Europa": 2846929.0,
            "Ozeanien": 10306.0
        },
        {
            "Year": 2009,
            "Afrika": 13464199.0,
            "Amerika": 2284914.0,
            "Asien": 29318639.0,
            "Europa": 2474846.0,
            "Ozeanien": 10476.0
        },
        {
            "Year": 2010,
            "Afrika": 14089169.0,
            "Amerika": 2326725.0,
            "Asien": 29573707.0,
            "Europa": 2394195.0,
            "Ozeanien": 10511.0
        },
        {
            "Year": 2011,
            "Afrika": 16692983.0,
            "Amerika": 2389641.0,
            "Asien": 26267921.0,
            "Europa": 2259291.0,
            "Ozeanien": 9381.0
        },
        {
            "Year": 2012,
            "Afrika": 17513490.0,
            "Amerika": 2424701.0,
            "Asien": 25996023.0,
            "Europa": 2205568.0,
            "Ozeanien": 8369.0
        },
        {
            "Year": 2013,
            "Afrika": 18386375.0,
            "Amerika": 2453181.0,
            "Asien": 32667250.0,
            "Europa": 1129515.0,
            "Ozeanien": 7456.0
        },
        {
            "Year": 2014,
            "Afrika": 21762661.0,
            "Amerika": 2286663.0,
            "Asien": 41301002.0,
            "Europa": 1978018.0,
            "Ozeanien": 6860.0
        },
        {
            "Year": 2015,
            "Afrika": 25297358.0,
            "Amerika": 2215710.0,
            "Asien": 45832736.0,
            "Europa": 2225521.0,
            "Ozeanien": 6880.0
        },
        {
            "Year": 2016,
            "Afrika": 28638173.0,
            "Amerika": 2059233.0,
            "Asien": 47702403.0,
            "Europa": 1847394.0,
            "Ozeanien": 6765.0
        },
        {
            "Year": 2017,
            "Afrika": 33741399.0,
            "Amerika": 1542257.0,
            "Asien": 54764521.0,
            "Europa": 1450486.0,
            "Ozeanien": 6512.0
        },
        {
            "Year": 2018,
            "Afrika": 34116415.0,
            "Amerika": 1412708.0,
            "Asien": 56947025.0,
            "Europa": 1302886.0,
            "Ozeanien": 6177.0
        },
        {
            "Year": 2019,
            "Afrika": 34510791.0,
            "Amerika": 2154762.0,
            "Asien": 56573291.0,
            "Europa": 1243615.0,
            "Ozeanien": 6067.0
        },
        {
            "Year": 2020,
            "Afrika": 35257022.0,
            "Amerika": 2647010.0,
            "Asien": 56775889.0,
            "Europa": 1151778.0,
            "Ozeanien": 5902.0
        },
        {
            "Year": 2021,
            "Afrika": 35920192.0,
            "Amerika": 2570837.0,
            "Asien": 57070205.0,
            "Europa": 1136883.0,
            "Ozeanien": 5557.0
        }
    ]