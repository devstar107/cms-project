import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { useAuth } from 'react-oauth2-pkce'
import Grid from '@material-ui/core/Grid'
import CheckIcon from '@material-ui/icons/Check'
import Select from '../common/Select/Select'
import Button from '../common/Button/Button'

import './Configre.scss'

import { signOut } from '../../features/auth/authSlice'
import {
  setCameraControl,
  setSelectedTrimValue,
  setSelectedInterior,
  setSelectedExterior,
  fetchImagesFromCDN,
  clearState
} from '../../features/ui/uiSlice'
import clsx from 'clsx'

const Configre = ({
  checkHyundaiBrand,
  productName,
  configData,
  brand,
  metaData,
  version,
  year
}) => {
  const { fscs, allCameraControls, allExteriorColors, allInteriorColors } =
    configData
  const dispatch = useDispatch()
  const { authService } = useAuth()
  const [trims, setTrims] = useState({
    data: fscs,
    value: fscs[0].value,
    name: fscs[0].title
  })
  const {
    configre: { cameraControls }
  } = useSelector((state) => state.ui)
  const [collection, setCollection] = useState([])

  const [exteriorColors, setExteriorColors] = useState({
    data: [],
    value: null
  })
  const [interiorColors, setInteriorColors] = useState({
    data: [],
    value: null
  })

  useEffect(() => {
    dispatch(setSelectedTrimValue({ name: trims.name, value: trims.value }))
  }, [trims])

  useEffect(() => {
    dispatch(setSelectedExterior({ value: exteriorColors.value }))
  }, [exteriorColors])

  useEffect(() => {
    dispatch(setSelectedInterior({ value: interiorColors.value }))
  }, [interiorColors])

  const logout = async () => authService.logout()

  const handleChangeTrim = (event) => {
    setCollection([])
    setTrims({
      data: trims.data,
      value: event.target.value,
      name: event?.nativeEvent?.srcElement?.textContent || ''
    })
  }

  const handleChangeExteriorColor = (item) => {
    setExteriorColors({ data: exteriorColors.data, value: item.id })
  }

  const handleChangeInteriorColor = (item) => {
    setInteriorColors({ data: interiorColors.data, value: item.id })
  }

  const handleChangeCameraControl = (event) => {
    dispatch(setCameraControl({ value: event.target.value }))
  }

  const getConstantCam = (newCams) => {
    const matched = newCams.filter((cam) => cam.value === cameraControls.value)
    if (matched.length) {
      resetExtColors()
      return cameraControls.value
    }
    return newCams[0].value
  }

  const getConstantExtColor = (newData) => {
    const matched = newData.filter((ext) => ext.id === exteriorColors.value)
    if (matched.length) {
      resetIntColors()
      return exteriorColors.value
    }
    return newData[0].id
  }

  const getConstantIntColor = (newData) => {
    const matched = newData.filter((int) => int.id === interiorColors.value)
    if (matched.length) {
      renderCars()
      return interiorColors.value
    }
    return newData[0].id
  }

  const handleLogout = () => {
    const action = signOut()
    dispatch(action)
    logout()
  }

  const resetExtColors = async () => {
    try {
      const newExtColors = allExteriorColors.filter(
        (extColor) =>
          collection.filter(
            (item) =>
              item?.images?.filter((img) => img.endsWith(cameraControls.value))
                .length && item.extcolor === extColor.id
          ).length
      )

      setExteriorColors({
        data: newExtColors,
        value: newExtColors.length && getConstantExtColor(newExtColors)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const resetIntColors = async () => {
    try {
      const resp = await fetch(
        `${process.env.REACT_APP_HMA_CDN_URL}&product__name=${productName}&fsc=${trims.value}&extcolor=${exteriorColors.value}&year=${year}`
      )
      const data = await resp.json()
      const newIntColors = allInteriorColors.filter(
        (intColor) =>
          data.results.filter(
            (item) =>
              item.intcolor === intColor.id &&
              item.extcolor === exteriorColors.value &&
              item.images.filter((img) => img.endsWith(cameraControls.value))
                .length
          ).length
      )
      setInteriorColors({
        data: newIntColors,
        value: newIntColors.length && getConstantIntColor(newIntColors)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const renderCars = () => {
    dispatch(
      fetchImagesFromCDN({
        productName,
        brand,
        interiorColor: interiorColors.value,
        exteriorColor: exteriorColors.value,
        trim: trims.value,
        latestVersion: version,
        year
      })
    )
  }

  useEffect(() => {
    cameraControls.value && resetExtColors()
  }, [collection, cameraControls.value])

  useEffect(() => {
    exteriorColors.value && resetIntColors()
  }, [exteriorColors.value])

  useEffect(() => {
    interiorColors.value && renderCars()
  }, [interiorColors.value])

  useEffect(() => {
    async function fetchData () {
      try {
        const resp = await fetch(
          `${process.env.REACT_APP_HMA_CDN_URL}&product__name=${productName}&fsc=${trims.value}&year=${year}`
        )
        const data = await resp.json()
        // const newLatestVersion = Math.max(
        //   ...data.results.map((res) => parseFloat(res.latest_version))
        // );
        const newCollection = data.results.filter(
          (item) => parseFloat(item.latest_version) === version
        )

        const allImages = newCollection.reduce(
          (prev, current) => prev.concat(current.images),
          []
        )

        if (allImages.length) {
          const newCams = allCameraControls.filter(
            (cam) => allImages.filter((img) => img.endsWith(cam.value)).length
          )
          dispatch(
            setCameraControl({
              data: newCams,
              value: newCams.length && getConstantCam(newCams)
            })
          )
        }
        setCollection(newCollection)
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [
    allCameraControls,
    brand,
    productName,
    trims,
    trims.value,
    version,
    year
  ])

  useEffect(() => {
    return function cleanup () {
      dispatch(clearState({}))
    }
  }, [])

  return (
    <div className={clsx('configre', checkHyundaiBrand ? 'lightTheme' : '')}>
      <div className='configre_header'>
        {/* <Icon className="configre_header_logo" item={<LogoImg />} /> */}
        <label>{metaData.description}</label>
      </div>
      <div className='menu'>
        <Select
          label='Trims'
          className='configre_trims'
          value={trims.value}
          name={trims.title}
          data={trims.data}
          handleChange={handleChangeTrim}
          lightTheme={checkHyundaiBrand}
        />

        <div className='exteriorColors'>
          <div className='exteriorColors_title'>
            <p>Exterior Colors</p>
          </div>
          <div className='exteriorColors_multiple'>
            <Grid container spacing={3}>
              {exteriorColors.data.map((item, index) => (
                <Grid key={item.id} item xs={4} sm={4}>
                  <Button
                    className='btnExteriorColor'
                    style={{ background: `${item.color}` }}
                    icon={
                      <CheckIcon
                        style={{
                          color: `${item.colorCheck}`
                        }}
                      />
                    }
                    active={item.id === exteriorColors.value}
                    onClick={() => handleChangeExteriorColor(item)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className='exteriorColors_nameColor'>
            <p>
              {
                exteriorColors.data.find(
                  (item) => item.id === exteriorColors.value
                )?.name
              }{' '}
            </p>
          </div>
          <div className='interiorColors_title'>
            <p>Interior Colors</p>
          </div>
          <div className='interiorColors_multiple'>
            <Grid container spacing={3}>
              {interiorColors.data.map((item, index) => (
                <Grid key={item.id} item xs={4} sm={4}>
                  <Button
                    className='btnInteriorColor'
                    style={{ background: `${item.color}` }}
                    icon={
                      <CheckIcon
                        style={{
                          color: `${item.colorCheck}`
                        }}
                      />
                    }
                    active={item.id == interiorColors.value}
                    onClick={() => handleChangeInteriorColor(item)}
                    data={item}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className='interiorColors_nameColor'>
            <p>
              {
                interiorColors.data.find(
                  (item) => item.id === interiorColors.value
                )?.name
              }{' '}
            </p>
          </div>
        </div>
        <Select
          className='configre_cameras'
          label='Views'
          value={cameraControls.value}
          data={cameraControls.data}
          handleChange={handleChangeCameraControl}
          lightTheme={checkHyundaiBrand}
        />
      </div>

      <div className='configre_logout'>
        <p>
          Digitalgiant <span onClick={handleLogout}>Logout</span>
        </p>
      </div>
    </div>
  )
}

export default withRouter(Configre)
