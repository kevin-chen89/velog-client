import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import AuthModalContainer from '../auth/AuthModalContainer';
import { RootState } from '../../modules';
import CommonPopup from './CommonPopup';
import useUserLoader from './hooks/useUserLoader';
import GlobalStyles from '../../GlobalStyles';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import gtag from '../../lib/gtag';

interface OwnProps {}
interface StateProps {
  layer: boolean;
}
interface DispatchProps {}
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ layer }) => {
  useUserLoader();

  const history = useHistory();

  useEffect(() => {
    const unregister = history.listen(location => {
      // adds setTimeout for page title sync
      // is there any better solution?
      setTimeout(() => {
        gtag('config', 'UA-125599395-1', {
          page_path: location.pathname + location.search,
        });
      }, 1000);
    });

    return () => {
      unregister();
    };
  }, [history]);

  return (
    <>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <CommonPopup />
      <GlobalStyles />
      <ToastContainer
        transition={Flip}
        position="top-right"
        autoClose={2000}
        closeOnClick
        pauseOnHover
      />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    layer: state.core.layer,
  }),
)(Core);
