import { Component, createContext, ReactNode } from "react";
import CellReducer, { ICellReducer, initialCells } from "../CellReducer";
import EggReducer, { IEggReducer, initialEggs } from "../EggReducer";
import FoodReducer, { IFoodReducer, initialFoods } from "../FoodReducer";
import SettingsReducer, {
  initialSettings,
  ISettingsReducer,
} from "../SettingsReducer";

export interface Props {
  children: ReactNode;
}

export interface IAppContext
  extends ISettingsReducer,
    ICellReducer,
    IFoodReducer,
    IEggReducer {}

const initialContext: IAppContext = {
  ...initialSettings,
  ...initialCells,
  ...initialFoods,
  ...initialEggs,
};

function Actions(app: Component<Props, IAppContext>): IAppContext {
  return {
    ...SettingsReducer(app),
    ...CellReducer(app),
    ...FoodReducer(app),
    ...EggReducer(app),
  };
}

const AppContext = createContext<IAppContext>(initialContext);
export class AppContextProvider extends Component<Props, IAppContext> {
  state: IAppContext = Actions(this);

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContext;
