import { ContextMenuModel } from "./context-menu-model";

export const menuForStatus: Array<ContextMenuModel> = [
    {
        menuText: 'Создать задачу',
        menuEvent: 'Handle create task',
      },
]


export const menuForTask: Array<ContextMenuModel> = [
  {
      menuText: 'Перенести задачу вправо',
      menuEvent: 'Handle change status for task to right',
  },
  {
    menuText: 'Перенести задачу влево',
    menuEvent: 'Handle change status for task to left',
},
{
  menuText: 'Завершить задачу',
  menuEvent: 'Handle change status for task to history',
},
]

