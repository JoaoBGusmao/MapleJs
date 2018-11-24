import store from './store';

export default (mapParams = () => ({}), mapActions) => (
  realMethod => (
    realParams => (
      realMethod({ ...mapParams(realParams), ...{ ...mapActions(store.dispatch) }, ...realParams })
    )
  )
);
