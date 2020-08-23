import merge from 'lodash.merge';

import { defaultTypeDefs } from './shared/defaults/defaultTypeDefs';
import {
  typeDefs as exampleTypeDefs,
  resolvers as exampleResolvers
} from './exampleModule/exampleModule';
import {
  typeDefs as dailyTypeDefs,
  resolvers as dailyResolvers
} from './dailyModule/dailyModule';
import {
  typeDefs as discordTypeDefs,
  resolvers as discordResolvers
} from './discordModule/discordModule';
import {
  typeDefs as optionTypeDefs,
  resolvers as optionResolvers
} from './optionsModule/optionsModule';
import { AlphaVantageAPI } from './shared/dataSources/AlphaVantageAPI';
import { DiscordAPI } from './shared/dataSources/DiscordAPI';
import { RobinhoodAPI } from './shared/dataSources/RobinhoodAPI';

const baseTypeDef = `
    type Query {
        _empty: String
    }
    type Mutation {
        _empty: String
    }
`;

export const typeDefs = [
  baseTypeDef,
  defaultTypeDefs,
  exampleTypeDefs,
  dailyTypeDefs,
  discordTypeDefs,
  optionTypeDefs
];

const baseResolver = {
  Query: {}
};

export const resolvers = merge(
  baseResolver,
  exampleResolvers,
  dailyResolvers,
  discordResolvers,
  optionResolvers
);

export const dataSources = () => {
  return {
    alphaVantageAPI: new AlphaVantageAPI(),
    discordAPI: new DiscordAPI(),
    robinhoodAPI: new RobinhoodAPI()
  };
};
