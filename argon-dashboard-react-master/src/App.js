import 'assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'assets/scss/argon-dashboard-react.scss'
import 'assets/css/style.css'
//import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { REMOVE_ERROR } from './constants/alertConstant'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from 'layouts/Admin.js'
import AuthLayout from 'layouts/Auth.js'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from './actions/userActions'
import ReactJkMusicPlayer from 'react-jinke-music-player'
import 'react-jinke-music-player/assets/index.css'
import store from './store'
import { useToasts } from 'react-toast-notifications'
import { REMOVE_MUSIC } from 'constants/playlistConstant'
function App() {
  const dispatch = useDispatch()
  const [audioLists, setAudioLists] = useState([
    {
      name: 'weeknd',
      cover:
        'data:image/png;base64,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',
      musicSrc: 'http://localhost:8888/js?vid=XXYlFuWEuKI',
    },
    { musicSrc: './XXYlFuWEuKI.mp3' },
  ])
  const { error } = useSelector((state) => state.alerts)
  const { isAuthenticated } = useSelector((state) => state.auth)

  const { playlist, error: Musicerror, loading: loadingMusic } = useSelector(
    (state) => state.musicList
  )
  const { addToast } = useToasts()
  React.useEffect(() => {
    if (!isAuthenticated) store.dispatch(loadUser())
    if (error) {
      addToast(error.message, { appearance: error.type })
      dispatch({ type: REMOVE_ERROR })
    }
  }, [error])
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path='/admin' render={(props) => <AdminLayout {...props} />} />
          <Route path='/auth' render={(props) => <AuthLayout {...props} />} />
          <Redirect from='/' to='/admin/index' />
        </Switch>
      </BrowserRouter>
      {isAuthenticated && (
        <ReactJkMusicPlayer
          quietUpdate
          onAudioListsChange={(currentPlayId, audioLists, audioInfo) => {
            dispatch({ type: REMOVE_MUSIC, payload: audioLists })
          }}
          remove={true}
          showDownload={false}
          autoPlay={false}
          mode='mini'
          clearPriorAudioLists
          audioLists={playlist}
        />
      )}
    </>
  )
}

export default App
