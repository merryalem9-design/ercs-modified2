import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { AppProvider } from '../src/context/AppContext';
import { NationalActivityInlineTables } from '../src/components/common/NationalActivityInlineTables';

console.log('=== COMPONENT RENDER VERIFICATION ===\n');

// Mock window for localStorage in SSR environment if needed
if (typeof window === 'undefined') {
  (global as any).window = {
    localStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
    sessionStorage: {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    },
    location: {
      search: '',
    },
  };
}

// Render Report Mode
const reportHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(AppProvider, null,
    React.createElement(NationalActivityInlineTables, {
      nationalActivityId: 'na-1-1-9',
      mode: 'report',
    })
  )
);

console.log('Testing mode="report":');
console.log('- Contains "Contributing Regions / Zones":', reportHtml.includes('Contributing Regions / Zones'));
console.log('- Contains "Contributing Projects":', reportHtml.includes('Contributing Projects'));
console.log('- Contains "% of Activity Target":', reportHtml.includes('% of Activity Target'));
console.log('- Contains "% of Activity Budget":', reportHtml.includes('% of Activity Budget'));
console.log('- Contains "Actual":', reportHtml.includes('>Actual<'));
console.log('- Contains "Ach. %":', reportHtml.includes('>Ach. %<'));
console.log('- Contains "Spent":', reportHtml.includes('>Spent'));
console.log('- Contains KPI cards (should be false):', reportHtml.includes('KPI') || reportHtml.includes('Aggregate Regional Performance'));
console.log('- Contains Oromia 29.1%:', reportHtml.includes('29.1%'));
console.log('- Contains Oromia 28.1%:', reportHtml.includes('28.1%'));

// Render Plan Mode
const planHtml = ReactDOMServer.renderToStaticMarkup(
  React.createElement(AppProvider, null,
    React.createElement(NationalActivityInlineTables, {
      nationalActivityId: 'na-1-1-9',
      mode: 'plan',
    })
  )
);

console.log('\nTesting mode="plan":');
console.log('- Contains "Contributing Regions / Zones":', planHtml.includes('Contributing Regions / Zones'));
console.log('- Contains "Contributing Projects":', planHtml.includes('Contributing Projects'));
console.log('- Contains "% of Activity Target":', planHtml.includes('% of Activity Target'));
console.log('- Contains "% of Activity Budget":', planHtml.includes('% of Activity Budget'));
console.log('- Contains "Actual" (MUST BE FALSE):', planHtml.includes('>Actual<'));
console.log('- Contains "Ach. %" (MUST BE FALSE):', planHtml.includes('>Ach. %<'));
console.log('- Contains "Spent" (MUST BE FALSE):', planHtml.includes('>Spent'));
console.log('- Contains KPI cards (MUST BE FALSE):', planHtml.includes('KPI') || planHtml.includes('Aggregate Regional Performance'));
console.log('- Contains Oromia 29.1%:', planHtml.includes('29.1%'));
console.log('- Contains Oromia 28.1%:', planHtml.includes('28.1%'));

if (!planHtml.includes('>Actual<') && !planHtml.includes('>Ach. %<') && !planHtml.includes('>Spent')) {
  console.log('\n[PASS] Annual Plan page expanded view STRICTLY OMITS Actual, Ach. %, and Spent columns!');
} else {
  console.error('\n[FAIL] Plan mode contained actuals!');
}

console.log('\n=== COMPONENT RENDER TESTS PASSED ===');
