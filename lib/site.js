// lib/site.js
import { gql } from 'graphql-request';
import { client } from './wp-client';

export async function getSiteData() {
  const query = gql`
    query SiteHeaderFooterMenus {
      header: menus(where: { slug: "Main Menu" }) {
        nodes {
          id
          name
          slug
          menuItems {
            nodes {
              id
              label
              url
              target
              parentId
              cssClasses
              childItems { nodes { id label url target parentId } }
            }
          }
        }
      }
      footer: menus(where: { slug: "Footer Menu" }) {
        nodes {
          id
          name
          slug
          menuItems {
            nodes {
              id
              label
              url
              target
              parentId
              cssClasses
              childItems { nodes { id label url target parentId } }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await client.request(query);
    const headerMenu = data.header?.nodes?.[0] ?? null;
    const footerMenu = data.footer?.nodes?.[0] ?? null;
    return { headerMenu, footerMenu };
  } catch (err) {
    console.error('Error fetching menus:', err);
    return { headerMenu: null, footerMenu: null };
  }
}
