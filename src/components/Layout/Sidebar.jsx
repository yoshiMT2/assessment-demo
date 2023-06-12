import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  UserGroupIcon,
  HomeIcon,
  DocumentMinusIcon,
  UserPlusIcon,
  UsersIcon,
  SquaresPlusIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/20/solid'
import { UseUserDetails } from '../../context/UserContext'


const navigation = [
  { name: 'マイページ', href: '/', icon: HomeIcon, current: true },
  { name: 'アセスメント結果を確認', href: '/result', current: false },
  { name: 'チームの結果を確認', href: '/team', current: false },
  { name: 'メンバー登録・編集', href: '/register/member', current: false },
  { name: 'チーム登録・編集', href: '/register/team', current: false },
  { name: '会社登録・編集', href: '/register/company', current: false },
  { name: 'ログアウト', href: '/login', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const user = UseUserDetails()[0]
  const [menuItems, setMenuItems] = useState(navigation)
  const [menu, setMenu] = useState('マイページ')
  const handleMenuItemClick = (itemName) => {
    setMenu(itemName)
  }

  useEffect(() => {
    if (user.is_staff) {
      setMenuItems(navigation)
    } else {
      setMenuItems(navigation)
    }
  }, [user.is_staff])

  function logoutUser() {
    localStorage.clear()
  }

  return (
    <>
      <div>
        <div className=" bg-zinc-100 top-16 fixed z-20 flex w-60 h-screen flex-col">
          <div className="flex grow flex-col mt-3 overflow-y-auto border-r px-6">
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="-mx-primary-2 space-y-3">
                <li key={menuItems[0].name}>
                  <NavLink
                    to={menuItems[0].href}
                    onClick={() => handleMenuItemClick(menuItems[0].name)}
                    className={classNames(
                      menuItems[0].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <HomeIcon
                      className={classNames(
                        menuItems[0].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[0].name}
                  </NavLink>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li>
                <li key={menuItems[1].name}>
                  <NavLink
                    to={menuItems[1].href}
                    onClick={() => handleMenuItemClick(menuItems[1].name)}
                    className={classNames(
                      menuItems[1].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <DocumentMinusIcon
                      className={classNames(
                        menuItems[1].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[1].name}
                  </NavLink>
                </li>
                <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                <li key={menuItems[2].name}>
                  <NavLink
                    to={menuItems[2].href}
                    onClick={() => handleMenuItemClick(menuItems[2].name)}
                    className={classNames(
                      menuItems[2].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <UserGroupIcon
                      className={classNames(
                        menuItems[2].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[2].name}
                  </NavLink>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li>
                <li key={menuItems[3].name}>
                  <NavLink
                    to={menuItems[3].href}
                    onClick={() => handleMenuItemClick(menuItems[3].name)}
                    className={classNames(
                      menuItems[3].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <UserPlusIcon
                      className={classNames(
                        menuItems[3].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[3].name}
                  </NavLink>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li>
                <li key={menuItems[4].name}>
                  <NavLink
                    to={menuItems[4].href}
                    onClick={() => handleMenuItemClick(menuItems[4].name)}
                    className={classNames(
                      menuItems[4].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <UsersIcon
                      className={classNames(
                        menuItems[4].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[4].name}
                  </NavLink>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li>
                <li key={menuItems[5].name}>
                  <NavLink
                    to={menuItems[5].href}
                    onClick={() => handleMenuItemClick(menuItems[5].name)}
                    className={classNames(
                      menuItems[5].name === menu
                        ? ' text-primary-2 font-bold'
                        : 'text-gray-700',
                      'group flex  gap-x-3 py-1 rounded-md text-sm leading-6'
                    )}
                  >
                    <SquaresPlusIcon
                      className={classNames(
                        menuItems[5].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                        'h-6 w-6 shrink-0'
                      )}
                      aria-hidden="true"
                    />
                    {menuItems[5].name}
                  </NavLink>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li>
                <li key={menuItems[6].name}>
                  <NavLink
                    to={menuItems[6].href}
                    onClick={logoutUser}
                    className='group flex gap-x-3 py-1 text-gray-700 rounded-md text-sm leading-6'
                  >
                    <ArrowRightOnRectangleIcon
                      className='h-6 w-6 shrink-0 group-hover:text-gray-500'
                      aria-hidden="true"
                    />
                    {menuItems[6].name}
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
