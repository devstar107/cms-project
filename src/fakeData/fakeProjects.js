export const fakeProjects = [
  {
    id: 'pj01',
    projectName: 'MY23 Genesis GV60',
    brand: 'genesis',
    status: 'compelete',
    version: '3.4',
    created: '03/04/22',
    lastUpdate: '06/02/22'
  },
  {
    id: 'pj02',
    projectName: 'MY23 Sonata RTE',
    brand: 'Hyundai',
    status: 'in development',
    version: '3.2',
    created: '02/28/22',
    lastUpdate: '02/28/22'
  },
  {
    id: 'pj03',
    projectName: 'MY23 G80E',
    brand: 'genesis',
    status: 'in review',
    version: '3.1',
    created: '01/08/22',
    lastUpdate: '03/08/22'
  }
]

export const projectDetail = [
  {
    rnd: 1,
    millestone: 'Lighting Review #1',
    date: '01/20/22',
    version: 'v1.2',
    status: 'Complete'
  },
  {
    rnd: 2,
    millestone: 'Lighting Review #2',
    date: '01/30/22',
    version: 'v1.3',
    status: 'Complete'
  },
  {
    rnd: 3,
    millestone: 'Lighting Review #3',
    date: '02/12/22',
    version: 'v1.4',
    status: 'Complete'
  },
  {
    rnd: 4,
    millestone: 'Lighting Review #3',
    date: '02/12/22',
    version: 'v1.4',
    status: 'Review'
  }
]

export const fakeCarDetails = [
  {
    carTitle: 'MY23 G80E',
    brand: 'genesis',
    trim: ['SE_FWD', 'SEL_FWD', 'SEL_CVN_FWD', 'SEL_PLS_FWD', 'LTD_FWD', 'NLine_FWD', 'NLine_NIT_FWD'],
    mc_ocn: '49402F401S088',
    pckg: 'N/A',
    exteriorColors: ['M6T', 'MEL', 'NNB', 'PR2', 'SB3'],
    allInteriorColors: ['SFM', 'XBD', 'CGB', 'LCD', 'CTD', 'M98', 'F4J'],
    interiorColors: [
      {
        exteriorColor: 'M6T',
        interiorColor: ['CGB', 'LCD', 'CTD']
      },
      {
        exteriorColor: 'MEL',
        interiorColor: ['SFM', 'M98', 'XBD', 'F4J']
      },
      {
        exteriorColor: 'NNB',
        interiorColor: ['XBD', 'F4J']
      },
      {
        exteriorColor: 'PR2',
        interiorColor: ['F4J']
      },
      {
        exteriorColor: 'SB3',
        interiorColor: ['LCD', 'CGB', 'CTD']
      }
    ]
  }
]
