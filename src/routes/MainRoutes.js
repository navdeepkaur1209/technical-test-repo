import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import Loadable from 'components/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

/* Components */
const Dashboard = Loadable(lazy(() => import('pages/dashboard')));
const Clients = Loadable(lazy(() => import('pages/users/clients')));
const ClientForm = Loadable(lazy(() => import('pages/users/clients/client')));
const AppUsers = Loadable(lazy(() => import('pages/users/app-users')));
const AppUserForm = Loadable(lazy(() => import('pages/users/app-users/user')));

const Jobs = Loadable(lazy(() => import('pages/jobs')));
const QuoteNew = Loadable(lazy(() => import('pages/quotes/new')));
const ClientInfo = Loadable(lazy(() => import('pages/quotes/client-info')));
const Paling = Loadable(lazy(() => import('pages/quotes/paling')));
const FencePricing = Loadable(lazy(() => import('pages/quotes/fence-pricing')));
const ProfitLoss = Loadable(lazy(() => import('pages/quotes/profit-loss')));
const Review = Loadable(lazy(() => import('pages/quotes/review')));
const SupplierOrder = Loadable(lazy(() => import('pages/quotes/supplier-order')));
const FencerJobCard = Loadable(lazy(() => import('pages/quotes/fencer-job-card')));
const Attachments = Loadable(lazy(() => import('pages/quotes/attachments')));
const SitePlan = Loadable(lazy(() => import('pages/quotes/site-plan')));

const PalingSample = Loadable(lazy(() => import('pages/quotes/samples/paling')));
const FencePricingSample = Loadable(lazy(() => import('pages/quotes/samples/fence-pricing')));
const ProfitLossSample = Loadable(lazy(() => import('pages/quotes/samples/profit-loss')));
const Testing = Loadable(lazy(() => import('pages/quotes/samples/paling/test')));

/* Main routing */
const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'dashboard',
          element: <Dashboard />
        },
        {
          path: 'jobs',
          element: <Jobs />
        },
        {
          path: 'quotes',
          children: [
            {
              path: 'add',
              element: <QuoteNew />
            },
            {
              path: ':quoteId',
              element: <ClientInfo />
            },
            {
              path: ':quoteId/main',
              element: <Paling />
            },
            {
              path: ':quoteId/fence-pricing',
              element: <FencePricing />
            },
            {
              path: ':quoteId/profit-loss',
              element: <ProfitLoss />
            },
            {
              path: ':quoteId/review',
              element: <Review />
            },
            {
              path: ':quoteId/supplier-order',
              element: <SupplierOrder />
            },
            {
              path: ':quoteId/supplier-order/:supplierId',
              element: <SupplierOrder />
            },
            {
              path: ':quoteId/fencer-job-card',
              element: <FencerJobCard />
            },
            {
              path: ':quoteId/attachments',
              element: <Attachments />
            },
            {
              path: ':quoteId/site-plan',
              element: <SitePlan />
            }
          ]
        },
        {
          path: 'samples',
          children: [
            {
              path: 'paling',
              element: <PalingSample />
            },
            {
              path: 'fence-pricing',
              element: <FencePricingSample />
            },
            {
              path: 'profit-loss',
              element: <ProfitLossSample />
            },
            {
              path: ':test',
              element: <Testing />
            }
          ]
        },
        {
          path: 'clients',
          children: [
            {
              path: '',
              element: <Clients />
            },
            {
              path: 'add',
              element: <ClientForm />
            },
            {
              path: ':clientId',
              element: <ClientForm />
            }
          ]
        },
        {
          path: 'app-users',
          children: [
            {
              path: '',
              element: <AppUsers />
            },
            {
              path: 'add',
              element: <AppUserForm />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
