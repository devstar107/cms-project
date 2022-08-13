import { Button, CircularProgress } from '@material-ui/core'
export const columnsProject = [
  {
    title: 'Project Name',
    dataIndex: 'name',
    key: 'name',
    clickable: true
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    render: (text) => <p style={{ textTransform: 'uppercase' }}>{text}</p>
  },
  {
    title: 'Year',
    dataIndex: 'year',
    key: 'year',
    align: 'center',
    render: (text) => <p className='text-center'>{text}</p>
  },
  {
    title: 'Live Status',
    dataIndex: 'live',
    key: 'live',
    clickable: true,
    render: (item) => (
      <Button
        variant='text'
        color='primary'
        sx={{ textTransform: 'uppercase' }}
      >
        {item.status}
      </Button>
    )
  },
  {
    title: 'Version',
    dataIndex: 'live',
    key: 'assetsVersion',
    align: 'center',
    render: (live) => <p className='text-center'>{live.assetsVersion}</p>
  },
  {
    title: 'Preview',
    dataIndex: 'latestVersion',
    key: 'latestVersion',
    align: 'center',
    clickable: true,
    render: (latestVersion) => (
      <Button variant='text' color='primary'>
        {latestVersion || <CircularProgress size={25} />}
      </Button>
    )
  },
  {
    title: 'Created',
    dataIndex: 'created',
    key: 'created',
    align: 'center',
    render: (text) => <p className='text-center'>{text}</p>
  },
  {
    title: 'Last Update',
    dataIndex: 'lastUpdated',
    key: 'lastUpdated',
    align: 'center',
    render: (text) => <p className='text-center'>{text}</p>
  }

]

// export const columnsProject = [
//   {
//     title: "Project Name",
//     dataIndex: "name",
//     key: "name",
//     alignItems: "left",
//     align: "center",
//   },
//   {
//     title: "Brand",
//     dataIndex: "brand",
//     key: "brand",
//     render: (text) => <p>{text}</p>,
//     alignItems: "left",
//     align: "center",
//   },
//   {
//     title: "Year",
//     dataIndex: "year",
//     key: "year",
//     render: (text) => <p>{text}</p>,
//     alignItems: "center",
//     align: "center",
//   },
//   {
//     title: "Created",
//     dataIndex: "created",
//     key: "created",
//     alignItems: "left",
//     align: "center",
//     render: (text) => <p className="text-center">{text}</p>,
//   },
//   {
//     title: "Last Updated",
//     dataIndex: "lastUpdated",
//     key: "lastUpdated",
//     alignItems: "left",
//     align: "center",
//     render: (text) => <p className="text-center">{text}</p>,
//   },
//   {
//     title: "Production Version",
//     dataIndex: "production",
//     key: "production",
//     alignItems: "center",
//     align: "center",
//     clickable: true,
//     render: () => (
//       <Button variant="text" color="primary">
//         Review
//       </Button>
//     ),
//   },
//   {
//     title: "Staging Version",
//     dataIndex: "staging",
//     key: "staging",
//     alignItems: "center",
//     align: "center",
//     clickable: true,
//     render: () => (
//       <Button variant="text" color="primary">
//         Review
//       </Button>
//     ),
//   },
// ];
