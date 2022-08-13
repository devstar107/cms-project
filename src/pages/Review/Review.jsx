import React, { useState, useEffect } from 'react'
import { withRouter, useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import Configre from '../../components/Configre/Configre'
import Select from '../../components/common/Select/Select'
import clsx from 'clsx'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import './Review.scss'
import Icon from '../../components/common/Icon/Icon'
import queryString from 'query-string'
import {
  GenesisLogoImg,
  CommentSpeechIcon,
  CompareVersionLogoImg,
  HyundaiLogoImg,
  HomeDarkIcon,
  HomeLightIcon
} from '../../elements/icons/icons'
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined'
import SpeakerNotesOffOutlinedIcon from '@material-ui/icons/SpeakerNotesOffOutlined'
import RadioButtonUncheckedOutlinedIcon from '@material-ui/icons/RadioButtonUncheckedOutlined'
import CallMadeOutlinedIcon from '@material-ui/icons/CallMadeOutlined'
import StopOutlinedIcon from '@material-ui/icons/StopOutlined'
import {
  ARROW,
  CIRCLE,
  GENESIS,
  HYUNDAI,
  LIVE_DOMAIN,
  PREVIEW_DOMAIN,
  SONATA,
  SQUARE
} from '../../constants/constants'
import {
  fetchAllProjectsList,
  fetchLatestVersion,
  setSelectedProject
} from '../../features/projects/projectsSlice'
import AddCommentTool from '../../components/AddCommentTool/AddCommentTool'
import ModalDisplay from '../../components/common/Modal/Modal'
import { ANNOTATIION_MODAL_TEXT } from '../../constants/contentText'
import Button from '../../components/common/Button/Button'
import CameraRender from '../../components/CameraRender/CameraRender'
import { clickMenu, selectedMarket } from '../../features/canvas/canvasSlice'
import {
  fetchProjectComments,
  setShowComments
} from '../../features/ui/uiSlice'
import { CircularProgress } from '@material-ui/core'

const Review = ({ location }) => {
  const history = useHistory()
  const dispatch = useDispatch()

  const {
    slider: { data },
    configre: {
      cameraControls,
      showComments,
      selectedTrimValue,
      selectedExterior,
      selectedInterior
    },

    saveComments
  } = useSelector((state) => state.ui)

  const { selectedProject, allProjects } = useSelector(
    (state) => state.projects
  )
  const [checkVanityPreviewDomain, setCheckVanityPreviewDomain] =
    useState(false)
  const [versionData, setVersionData] = useState({})
  const [activeTool, setActiveTool] = useState(null)
  const [openModal, setOpenModal] = useState(false)
  const [hideAnnotationToolBar, setHideAnnotationToolBar] = useState(true)
  const [annotationFlag, setAnnotationFlag] = useState(true);
  const [flag, setFlag] = useState(true);

  const [document_title, setDoucmentTitle] = useDocumentTitle('Review Tool')

  const currentURL = window.location.hostname
  const url = process.env.REACT_APP_DEFAULT_DOMAIN_URL
  const { hostname: checkDefaultURL } = new URL(url)
  const {
    version,
    id: projectID,
    brand,
    name,
    year,
    showAnnotationOnVanity,
    vanityURL
  } = selectedProject || {
    version: '',
    id: '',
    brand: '',
    year: '',
    showAnnotationOnVanity: true
  }
  const checkHyundaiBrand = brand === HYUNDAI

  useEffect(() => {
    if (checkDefaultURL === currentURL && selectedProject === null) {
      dispatch(setShowComments(false))
      dispatch(clickMenu('HIDE_MENU'))
      const parsed = queryString.parse(location.search)
      const { brand, name, projectId, version, year, preview} = parsed || {
        brand: null,
        name: null,
        projectId: null,
        version: null,
        year: null,
      }
      if (brand && name && projectId && version && year) {
        const numberParsed = parseFloat(version)
        dispatch(
          setSelectedProject({
            brand,
            id: projectId,
            name,
            version: numberParsed,
            year,
          })
        )
      } else {
        history.push('/projects')
      }
    } else {
      dispatch(fetchAllProjectsList())
    }
  }, [])

  useEffect(() => {
    async function fetchData () {
      if (
        allProjects &&
        allProjects.length > 0 &&
        checkDefaultURL !== currentURL &&
        selectedProject === null
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
            year
          } = getProjectDetails || {}
          
          if (checkDomain === LIVE_DOMAIN) {
            if (id) {
              setHideAnnotationToolBar(annotation || false)
              dispatch(
                setSelectedProject({
                  brand,
                  created,
                  id,
                  name,
                  version: assetsVersion,
                  year,
                  annotation,
                  vanityURL: true
                })
              )
            }
          } else if (checkDomain === PREVIEW_DOMAIN) {
            // const version = await fetchLatestVersion(name, year);
            const version = await fetchLatestVersion(name, year)
            setCheckVanityPreviewDomain(false)
            setAnnotationFlag(annotation || false)
            dispatch(
              setSelectedProject({
                brand,
                created,
                id,
                name,
                version,
                year,
                annotation,
                vanityURL: true
              })
            )
          }
        } else {
          window.location.replace(`${url}/projects`)
        }
      }
    }
    fetchData()
  }, [allProjects, currentURL])

  useEffect(() => {
    dispatch(setShowComments(false))
    dispatch(clickMenu('HIDE_MENU'))
    selectedProject && fetchVersions()
    const { id: projectID, vanityURL, annotation } = selectedProject || {
      id: ''
    }
    if (projectID) {
      // This api to fetch Project Comments
      const data = dispatch(fetchProjectComments({ projectID }));
    }
    if (vanityURL) {
      setHideAnnotationToolBar(showAnnotationOnVanity)
      setAnnotationFlag(annotation)
    }else{
      setHideAnnotationToolBar(false)
    }
  }, [selectedProject && selectedProject.id])

  const fetchVersions = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_CONFIG_URL}/v1/search/${process.env.REACT_APP_CONFIG_APP_ID}/configurations`
      )
      const data = await resp.json()
      const versions = data.data[0].data.configurations.find(
        (version) => version.projectId === selectedProject.id
        // && version.id === selectedProject.version
      )
      setDoucmentTitle(versions.meta.title)
      setVersionData(versions)
    } catch (error) {
      console.log(error)
      history.push('/projects')
    }
  }

  const onToolClick = (toolType) => {
    if (toolType) {
      setActiveTool(toolType)
      setOpenModal(true)
    }
  }

  const onMenuClick = () => {
    history.push('/projects')
  }
  const cameraTitle =
    cameraControls &&
    cameraControls.data.filter((cam) => cam.value === cameraControls.value)

  const disableAnnotationTool =
    cameraTitle && cameraTitle[0]?.title.toLowerCase().includes('360')

  const onConfirmTool = () => {
    dispatch(clickMenu('ADD_MENU'))
    if (activeTool === ARROW) {
      dispatch(selectedMarket('ARROW_CONFIGRE'))
    }
    if (activeTool === SQUARE) {
      dispatch(selectedMarket('SQUARE_CONFIGRE'))
    }
    if (activeTool === CIRCLE) {
      dispatch(selectedMarket('CIRCE_CONFIGRE'))
    }
    setOpenModal(false)
  }

  const onCommentShowClick = () => {
    if (showComments) {
      dispatch(setShowComments(false))
      dispatch(clickMenu('HIDE_MENU'))
    } else {
      dispatch(setShowComments(true))
      dispatch(clickMenu('SHOW_MENU'))
    }
  }
  const filterComments =
    saveComments &&
    selectedTrimValue &&
    Array.isArray(saveComments) &&
    cameraControls &&
    saveComments.filter(
      ({
        versionId,
        projectId,
        fscId,
        interiorId,
        cameraControlId,
        exteriorColorId
      }) => {
        // console.log("fscId", selectedTrimValue.value, fscId);
        // console.log("projectId --- ", projectID, projectId);
        // console.log("versionId --- ", versionId);
        // console.log(
        //     "cameraControlId --- ",
        //     cameraControlId,
        //     cameraControls.value
        // );
        // console.log(
        //     "exteriorColorId --- ",
        //     exteriorColorId,
        //     selectedExterior
        // );
        // console.log("interiorId --- ", interiorId, selectedInterior);
        return (
          selectedTrimValue.value === fscId &&
          projectId === projectID &&
          versionId === version &&
          cameraControlId === cameraControls.value &&
          exteriorColorId === selectedExterior.value &&
          interiorId === selectedInterior.value
        )
      }
    )
  //
  return (
    <div className={clsx('review', checkHyundaiBrand && 'light-theme')}>
      <div className='review_home-icon' onClick={onMenuClick}>
        {checkHyundaiBrand ? <HomeDarkIcon /> : <HomeLightIcon />}
      </div>
      <div>
        <div className='brand-logo'>
          {brand === HYUNDAI && (
            <Icon
              className='brand-logo_hyundai_size'
              item={<HyundaiLogoImg />}
            />
          )}
          {brand === GENESIS && (
            <Icon
              className='brand-logo_genesis_size'
              item={<GenesisLogoImg />}
            />
          )}
        </div>

        <div className='review-layout'>
          <div className='config-tools'>
            {versionData?.configurations?.fscs && (
              <Configre
                checkHyundaiBrand={checkHyundaiBrand}
                configData={versionData.configurations}
                brand={brand}
                metaData={versionData.meta}
                productName={name}
                version={version}
                year={year}
              />
            )}
          </div>
          <div className='car-images'>
            {selectedProject && (
              <>
                <div
                  className={clsx(
                    'viewport_bar',
                    checkHyundaiBrand && 'viewport_bar-lightTheme'
                  )}
                >
                  {!hideAnnotationToolBar &&(
                    <>
                      <h4 className='version-number'>Version: {version}</h4>

                      <div className='annotation-tools'>
                        <Icon
                          className='viewport_bar_icon-compare'
                          item={<CompareVersionLogoImg />}
                        />
                        {!disableAnnotationTool && annotationFlag &&( 
                          <>
                            <AddCommentTool onToolClick={onToolClick} />
                            <div
                              className='viewport_bar_icon'
                              onClick={onCommentShowClick}
                            >
                              {showComments
                                ? ( <ChatOutlinedIcon /> ) : (<SpeakerNotesOffOutlinedIcon />
                                  )}
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>

                <div className='viewport'>
                  <CameraRender
                    vanityURL={vanityURL}
                    brand={brand}
                    data={data}
                    cameraControls={cameraControls}
                    filterComments={filterComments}
                    showComments={showComments}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <ModalDisplay
        modalBody={
          <div className='review_body-text'>
            <div>{ANNOTATIION_MODAL_TEXT}</div>
            <div className='selected-icon'>
              {activeTool === ARROW && (
                <CallMadeOutlinedIcon style={{ fontSize: 60 }} />
              )}
              {activeTool === CIRCLE && (
                <RadioButtonUncheckedOutlinedIcon style={{ fontSize: 60 }} />
              )}
              {activeTool === SQUARE && (
                <StopOutlinedIcon style={{ fontSize: '4rem' }} />
              )}
            </div>

            <div className='next-wrapper'>
              <Button className='next-button' onClick={onConfirmTool}>
                Next
              </Button>
            </div>
          </div>
        }
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
      {checkVanityPreviewDomain && (
        <div className='projects-loader'>
          <CircularProgress />
        </div>
      )}
    </div>
  )
}

export default withRouter(Review)
