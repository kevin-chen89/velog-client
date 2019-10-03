import * as React from 'react';
import { connect } from 'react-redux';
import OpaqueLayer from '../../components/common/OpaqueLayer';
import AuthModalContainer from '../auth/AuthModalContainer';
import { RootState } from '../../modules';
import UserLoader from './UserLoader';
import CommonPopup from './CommonPopup';

interface OwnProps {}
interface StateProps {
  layer: boolean;
}
interface DispatchProps {}
type CoreProps = OwnProps & StateProps & DispatchProps;

const Core: React.FC<CoreProps> = ({ layer }) => {
  return (
    <>
      <OpaqueLayer visible={layer} />
      <AuthModalContainer />
      <UserLoader />
      <CommonPopup />
    </>
  );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  state => ({
    layer: state.core.layer,
  }),
)(Core);
