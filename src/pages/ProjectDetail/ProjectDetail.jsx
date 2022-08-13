import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './ProjectDetail.scss'
import Menu from '../../components/Menu/Menu'
import ContentHeader from '../../components/ContentHeader/ContentHeader'
import Table from '../../components/common/Table/Table'
import Grid from '@material-ui/core/Grid'
import Button from '../../components/common/Button/Button'
import { ThreeDotImg } from '../../elements/icons/icons'
import { projectDetail } from '../../fakeData/fakeProjects'

import {
  animation,
  Item,
  Menu as MenuMini,
  useContextMenu
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'
import PageHeader from '../../components/common/PageHeader/PageHeader'
import clsx from 'clsx'
import { Typography } from '@material-ui/core'

const ProjectDetail = () => {
  const history = useHistory()
  const [selectedTrim, setSelectedTrim] = useState('SE_FWD')
  const [selectedExterior, setSelectedExterior] = useState('MEL')
  const [showInteriorColors, setShowInteriorColors] = useState([])
  // const ui = useSelector((state) => state.ui.presentation);
  const selectedProject = useSelector(
    (state) => state.projects.selectedProject
  )
  const carDetails = useSelector((state) => state.projects.carDetails)
  const carDetail = carDetails.find(
    ({ carTitle }) => carTitle === 'MY23 G80E'
  )
  const {
    carTitle,
    exteriorColors,
    mc_ocn,
    pckg,
    trim,
    allInteriorColors,
    interiorColors
  } = carDetail || {}

  const { name, title, status } = selectedProject

  const handleClickRowProject = (e, itemRow) => {
    history.push('/review')
  }

  const MENU_ID = 'menu-id'
  const { show } = useContextMenu({
    id: MENU_ID
  })

  useEffect(() => {
    const findInteriorColors =
            interiorColors.find(
              ({ exteriorColor }) => exteriorColor === selectedExterior
            )?.interiorColor || []
    setShowInteriorColors(findInteriorColors)
  }, [carDetails, interiorColors, selectedExterior])

  const handleContextMenu = (e, targetValue) => {
    e.preventDefault()
    show(e, {
      props: {
        targetValue
      }
    })
  }

  const columnsDetailProject = [
    {
      title: 'RND',
      dataIndex: 'rnd',
      key: 'rnd'
    },
    {
      title: 'Millestone',
      dataIndex: 'millestone',
      key: 'millestone',
      clickable: true
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <p>{text}</p>
    },
    {
      title: 'Version',
      dataIndex: 'version',
      key: 'version',
      align: 'center',
      render: (text) => <p className='text-center'>{text}</p>
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (text) => <p className='text-center'>{text}</p>
    },
    {
      title: '',
      dataIndex: '',
      key: 'func',
      align: 'center',
      render: (text, record) => (
        <Button
          className='invert-100'
          icon={<ThreeDotImg />}
          onClick={(e) => handleContextMenu(e, record)}
        />
      )
    }
  ]

  const handleItemClickDowload = ({ event, props }) => {}
  const handleItemClickOpen = ({ event, props }) => {}

  return (
    <>
      <PageHeader />

      <div className='private_dashboard detailProject'>
        <div className='private_menu'>
          <Menu status='PROJECT_DETAIL_MENUS' />
        </div>
        <div className='private_header detailProject_header'>
          <ContentHeader name={name} title={title} status={status} />
        </div>
        <div className='private_content'>
          <Table
            className='dashboard_tableProjects'
            columns={columnsDetailProject}
            dataSource={projectDetail}
            onAction={handleClickRowProject}
            hover
          />
        </div>
        <div className='private_additionalContent detailProject_left'>
          <div className='leftContent'>
            <div className='leftContent_header border-bottom-gray'>
              <div className='leftContent_header_name'>
                <p>{carTitle}</p>
              </div>
            </div>

            <div className='leftContent_body border-bottom-gray'>
              <Grid container spacing={0}>
                {trim.map((item, index) => (
                  <Grid key={index} item xs={12} sm={12}>
                    <p
                      className={clsx(
                        selectedTrim === item &&
                                                    'leftContent_body_trimActive'
                      )}
                      onClick={() =>
                        setSelectedTrim(item)}
                    >
                      {item}
                    </p>
                  </Grid>
                ))}
              </Grid>
            </div>
            <div className='leftContent_body'>
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className='leftContent_body_selectedDetails'
                >
                  <p>Trim Name:</p>
                  <p>{selectedTrim}</p>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className='leftContent_body_selectedDetails'
                >
                  <p>MC/OCN:</p>
                  <p>{mc_ocn}</p>
                </Grid>
              </Grid>
              <br />
              <div className='leftContent_body_selectedDetails'>
                <p>PCKG</p>
                <p>{pckg}</p>
              </div>

              <br />
              <Grid container spacing={0}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  className='leftContent_body_selectedDetails'
                >
                  <p>EXT COLOR:</p>
                  {exteriorColors.map((item, index) => (
                    <Grid key={index} item xs={12} sm={6}>
                      <p
                        className={clsx(
                          selectedExterior === item &&
                                                        'leftContent_body_exteriorColorActive'
                        )}
                        onClick={() =>
                          setSelectedExterior(item)}
                      >
                        {item}
                      </p>
                    </Grid>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  wrap='nowrap'
                  spacing={2}
                  className='leftContent_body_selectedInterior'
                >
                  <p>INT COLOR:</p>
                  <div>
                    <Grid container spacing={0}>
                      {allInteriorColors.map(
                        (colorItem, index) => (
                          <Grid item xs={6}>
                            <p
                              className={clsx(
                                showInteriorColors.includes(
                                  colorItem
                                ) &&
                                                                    'leftContent_body_interiorColorActive'
                              )}
                            >
                              {colorItem}
                            </p>
                          </Grid>
                        )
                      )}
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        <MenuMini
          id={MENU_ID}
          animation={animation.slide}
          theme='custome'
        >
          <Item onClick={handleItemClickOpen}>Open</Item>
          <Item onClick={handleItemClickDowload}>Dowload</Item>
        </MenuMini>
      </div>
    </>
  )
}

export default ProjectDetail
