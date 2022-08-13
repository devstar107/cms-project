import React, { useEffect, useState } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader/PageHeader'
import Table from '../../components/common/Table/Table'
import {
  fetchAllProjectsList,
  fetchLatestVersion,
  setSelectedProject,
  updateProjectList
} from '../../features/projects/projectsSlice'
import { columnsProject } from './ProjectColumns'
import './Projects.scss'
import {
  COLUMN_LATEST_VERSION,
  LIVE_DOMAIN,
  PREVIEW_DOMAIN,
  COLUMN_LIVE
} from 'constants/constants'

const Projects = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [checkVanityPreviewDomain, setCheckVanityPreviewDomain] =
    useState(false)
  const { allProjects, loadingAllProjects } = useSelector(
    (state) => state.projects
  )

  const currentURL = window.location.hostname
  const url = process.env.REACT_APP_DEFAULT_DOMAIN_URL
  const { hostname: checkDefaultURL } = new URL(url)

  useEffect(() => {
    dispatch(fetchAllProjectsList())
  }, [])

  useEffect(() => {
    async function fetchData () {
      if (
        allProjects &&
        allProjects.length > 0 &&
        checkDefaultURL !== currentURL
      ) {
        let checkDomain = ''

        const getProjectDetails = allProjects.find(({ preview, live }) => {
          if (preview.domain === currentURL) {
            checkDomain = PREVIEW_DOMAIN
            setCheckVanityPreviewDomain(true)
            return true
          } else if (live.domain === currentURL) {
            checkDomain = LIVE_DOMAIN
            return true
          }
        })
        if (getProjectDetails) {
          const {
            brand,
            preview: { annotation },
            created,
            id,
            name,
            live: { assetsVersion },
            year,
          } = getProjectDetails || {}
          if (checkDomain === LIVE_DOMAIN) {
            if (id) {
              dispatch(
                setSelectedProject({
                  brand,
                  created,
                  id,
                  name,
                  version: assetsVersion,
                  year,
                  preview: annotation,
                  showAnnotationOnVanity: annotation,
                  vanityURL: true
                })
              )
              history.push(
                `/review?name=${name}&brand=${brand}&mode=preview&version=${assetsVersion}&projectId=${id}&year=${year}`
              )
            }
          } else if (checkDomain === PREVIEW_DOMAIN) {
            // const version = await fetchLatestVersion(name, year);
            const version = await fetchLatestVersion(name, year)
            dispatch(
              setSelectedProject({
                brand,
                created,
                id,
                name,
                version,
                year,
                preview: {annotation},
                vanityURL: true
              })
            )
            history.push(
              `/review?name=${name}&brand=${brand}&mode=preview&version=${version}&projectId=${id}&year=${year}`
            )
          }
        }
      }
    }
    fetchData()
  }, [allProjects, currentURL])

  const handleClickRowProject = (e, columnName, itemRow) => {
    if (columnName === COLUMN_LIVE) {
      const {
        brand,
        created,
        id,
        name,
        live: { assetsVersion },
        year,
        preview: {annotation}
      } = itemRow
      const projectData = {
        brand,
        created,
        id,
        name,
        version: assetsVersion,
        year,
        preview: {annotation}
      }

      dispatch(setSelectedProject(projectData))
      history.push(
        `/review?name=${name}&brand=${brand}&mode=live&version=${assetsVersion}&projectId=${id}&year=${year}`
      )
    } else if (columnName === COLUMN_LATEST_VERSION) {
      const { brand, created, id, name, latestVersion, year, preview: {annotation}} = itemRow
      if (latestVersion) {
        const projectData = {
          brand,
          created,
          id,
          name,
          version: latestVersion,
          year,
          preview: {annotation}
        }
        dispatch(setSelectedProject(projectData))
        history.push(
          `/review?name=${name}&brand=${brand}&mode=preview&version=${latestVersion}&projectId=${id}&year=${year}&preview=${annotation}`
        )
      }
    }
  }

  useEffect(() => {
    async function getLatestVersion () {
      const results = await Promise.all(
        allProjects.map(async ({ name, year }) => {
          const version = await fetchLatestVersion(name, year)
          return { projectName: name, version, year }
        })
      )
      if (results && results.length > 0) {
        const updatedList = []
        allProjects.forEach((item) => {
          const getVersion = results.find(
            ({ projectName, year }) =>
              projectName === item.name && year === item.year
          )
          updatedList.push({ ...item, latestVersion: getVersion.version })
        })
        dispatch(updateProjectList(updatedList))
      }
    }
    getLatestVersion()
  }, [allProjects])

  return (
    <>
      <PageHeader />
      {loadingAllProjects && !checkVanityPreviewDomain
        ? (
          <div className='projects'>
            <Table
              className='dashboard_tableProjects'
              columns={columnsProject}
              dataSource={allProjects || []}
              onAction={handleClickRowProject}
              hover
              hoverClickDisableAtRow={{
                columnName: 'live.status',
                value: 'development'
              }}
            />
          </div>
          )
        : (
          <div className='projects-loader'>
            <CircularProgress />
          </div>
          )}
    </>
  )
}

export default Projects
