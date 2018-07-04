import {merge} from 'lodash';
import {MountRendererProps} from 'enzyme';
import {createPolarisContext, polarisContextTypes} from '@shopify/polaris';

export * from '@shopify/enzyme-utilities';

interface Configs {
  additionalOptions?: MountRendererProps;
  locale?: string;
}

export function createWithAppMountOptions(
  configs?: Configs,
): MountRendererProps {
  const polarisOptions = {
    context: {...createPolarisContext()},
    childContextTypes: polarisContextTypes,
  };

  if (!configs) {
    return polarisOptions;
  }

  const additionalOptions =
    configs && configs.additionalOptions ? {...configs.additionalOptions} : {};

  return merge(additionalOptions, polarisOptions);
}
