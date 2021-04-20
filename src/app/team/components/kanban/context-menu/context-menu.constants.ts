import { ContextMenuModel } from "./context-menu-model";

export const munuForStatus: Array<ContextMenuModel> = [
    {
        menuText: 'Создать задачу',
        menuEvent: 'Handle create task',
      },
]


export const munuForTask: Array<ContextMenuModel> = [
  {
      menuText: 'Перенести задачу вправо',
      menuEvent: 'Handle change status for task to riight',
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

