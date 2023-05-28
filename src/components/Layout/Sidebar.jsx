import { Fragment, useState, useEffect } from 'react'
import { Disclosure } from '@headlessui/react'
import { NavLink } from 'react-router-dom'
import { userAtom } from '../../utils/atom'
import { useAtom } from 'jotai'
import {
  PlusIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentMinusIcon,
  UserPlusIcon,
  SquaresPlusIcon,
  Cog8ToothIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/20/solid'
// import { User } from '../../utils/type'

const navigation = [
  { name: 'マイページ', href: '/', icon: HomeIcon, current: true },
  { name: 'アセスメント結果を確認', href: '/result', current: false },
  { name: 'チームの結果を確認', href: '/team', current: false },
  { name: 'メンバー登録・編集', href: '/register/member', current: false },
  { name: '会社登録・編集', href: '/register/company', current: false },
  { name: 'ログアウト', href: '/logout', current: false },
]

const teams = ["A", "B"]

const teamMembers = [
  { team: "A", name: "メンバー1" },
  { team: "A", name: "メンバー2" },
  { team: "A", name: "メンバー3" },
  { team: "B", name: "メンバー4" },
  { team: "B", name: "メンバー5" },
  { team: "B", name: "メンバー6" },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Sidebar() {
  const [user,] = useAtom(userAtom)
  const [menuItems, setMenuItems] = useState(navigation)
  const [menu, setMenu] = useState('HOME')
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

  return (
    <>
      <div>
        <div className=" bg-zinc-100 top-16 fixed z-20 flex w-60 h-screen flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
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
                {/* <li key={menuItems[2].name}>
                  <Disclosure
                    as="div"
                    className=""
                    onClick={() => handleMenuItemClick(menuItems[2].name)}
                  >
                    {({ open }) => (
                      <>
                        <div className="flow-root">
                          <Disclosure.Button
                            className={classNames(
                              menuItems[2].name === menu
                                ? ' text-primary-2 font-bold'
                                : 'text-gray-700',
                              'group grid grid-cols-3 py-1 rounded-md text-sm items-center'
                            )}
                          >
                            <div className="flex items-center col-span-2">
                              <UserGroupIcon
                                className={classNames(
                                  menuItems[2].name === menu ? 'text-primary-2' : 'text-gray-400 group-hover:text-gray-500',
                                  'h-6 w-6 shrink-0'
                                )}
                                aria-hidden="true"
                              />
                              <div className='ml-3 whitespace-nowrap'>
                                {menuItems[2].name}
                              </div>
                            </div>
                            <div className="justify-self-end">
                              {open ? (
                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </div>
                          </Disclosure.Button>
                        </div>

                        <Disclosure.Panel className="pt-2">
                          <div className="space-y-4">
                            {teams.map((team, idx) => (
                              <NavLink
                                key={idx}
                                to={`/result/team/${teams[idx]}`}
                                onClick={() => handleMenuItemClick(teams[idx])}
                                className={classNames(
                                  teams[idx] === menu
                                    ? ' text-primary-2 font-bold'
                                    : 'text-gray-700',
                                  'group flex ml-10 gap-x-3 rounded-md text-sm leading-6'
                                )}
                              >
                                <div>
                                  {teams[idx]}
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <div className='border-[0.5px] border-zinc-400 -mx-6 mt-3' />
                </li> */}
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
                    <SquaresPlusIcon
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
                    className='group flex gap-x-3 py-1 text-gray-700 rounded-md text-sm leading-6'
                  >
                    <ArrowRightOnRectangleIcon
                      className='h-6 w-6 shrink-0 group-hover:text-gray-500'
                      aria-hidden="true"
                    />
                    {menuItems[5].name}
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
