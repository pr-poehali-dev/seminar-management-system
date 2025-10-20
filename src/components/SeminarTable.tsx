import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  fetchSeminars,
  setCurrentType,
  setSearchQuery,
  setPage,
  setRowsPerPage,
  toggleSelectSeminar,
  deleteSeminars,
  clearSelection,
} from '@/store/seminarSlice';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SeminarTable() {
  const dispatch = useAppDispatch();
  const {
    filteredSeminars,
    users,
    loading,
    currentType,
    searchQuery,
    page,
    rowsPerPage,
    selectedIds,
  } = useAppSelector((state) => state.seminars);

  useEffect(() => {
    dispatch(fetchSeminars());
  }, [dispatch]);

  const totalPages = Math.ceil(filteredSeminars.length / rowsPerPage);
  const paginatedSeminars = filteredSeminars.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  const handleDelete = () => {
    if (selectedIds.length > 0) {
      dispatch(deleteSeminars(selectedIds));
    }
  };

  const getSpeakerName = (userId: number) => {
    const user = users.find(u => u.id === userId);
    return user ? user.fullName : 'Неизвестный спикер';
  };

  const tabs = [
    { key: 'upcoming', label: 'Будущие' },
    { key: 'history', label: 'История' },
    { key: 'application', label: 'Заявки на семинар' },
  ] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Icon
            name="Search"
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Поиск по семинарам"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Icon name="X" size={16} />
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 gap-4">
        <div className="flex gap-3 md:gap-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => dispatch(setCurrentType(tab.key))}
              className={`pb-3 px-1 text-xs md:text-sm font-medium transition-colors relative whitespace-nowrap ${
                currentType === tab.key
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              {currentType === tab.key && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-xs md:text-sm">
          <span className="text-gray-600 hidden sm:inline">Показывать</span>
          <Select
            value={rowsPerPage.toString()}
            onValueChange={(value) => dispatch(setRowsPerPage(parseInt(value)))}
          >
            <SelectTrigger className="w-16 md:w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>

          <span className="text-gray-600 hidden sm:inline">
            Страница {page + 1} из {totalPages || 1}
          </span>

          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(setPage(Math.max(0, page - 1)))}
              disabled={page === 0}
            >
              <Icon name="ChevronLeft" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dispatch(setPage(Math.min(totalPages - 1, page + 1)))}
              disabled={page >= totalPages - 1}
            >
              <Icon name="ChevronRight" size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              {currentType === 'upcoming' && <TableHead className="w-12"></TableHead>}
              <TableHead className="min-w-[200px]">Название</TableHead>
              <TableHead className="min-w-[150px] hidden sm:table-cell">Спикер</TableHead>
              {currentType === 'application' && <TableHead className="min-w-[120px] hidden md:table-cell">Номер телефона</TableHead>}
              <TableHead className="min-w-[100px]">Дата</TableHead>
              {currentType === 'history' && <TableHead className="w-20 hidden sm:table-cell">Лайки</TableHead>}
              {currentType !== 'application' && <TableHead className="w-12"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Загрузка...
                </TableCell>
              </TableRow>
            ) : paginatedSeminars.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Здесь пока нет семинаров
                </TableCell>
              </TableRow>
            ) : (
              paginatedSeminars.map((seminar) => {
                const speaker = getSpeakerName(seminar.userId);
                const user = users.find(u => u.id === seminar.userId);
                
                return (
                  <TableRow key={seminar.id}>
                    {currentType === 'upcoming' && (
                      <TableCell>
                        <Checkbox
                          checked={selectedIds.includes(seminar.id)}
                          onCheckedChange={() => dispatch(toggleSelectSeminar(seminar.id))}
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <div className="max-w-md">
                        <p className="font-medium text-gray-900 text-sm">{seminar.title}</p>
                        {seminar.description && (
                          <p className="text-xs text-gray-500 mt-1">
                            {seminar.description}
                          </p>
                        )}
                        <p className="sm:hidden text-xs text-gray-600 mt-1">{speaker}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-700 text-sm hidden sm:table-cell">{speaker}</TableCell>
                    {currentType === 'application' && (
                      <TableCell className="text-gray-700 text-sm hidden md:table-cell">
                        {user?.phone || 'Не указан'}
                      </TableCell>
                    )}
                    <TableCell className="text-gray-700 text-sm">{seminar.date}</TableCell>
                    {currentType === 'history' && (
                      <TableCell className="text-gray-700 text-sm hidden sm:table-cell">{seminar.likes || 0}</TableCell>
                    )}
                    {currentType !== 'application' && (
                      <TableCell>
                        <button
                          onClick={() => dispatch(deleteSeminars([seminar.id]))}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                        >
                          <Icon name="Trash2" size={16} className="text-gray-600" />
                        </button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 flex items-center gap-4 border border-gray-200">
          <button
            onClick={() => dispatch(clearSelection())}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <Icon name="X" size={16} className="text-gray-600" />
          </button>
          <span className="text-sm text-gray-700">
            Количество выбранных товаров: {selectedIds.length}
          </span>
          <Button
            onClick={handleDelete}
            variant="ghost"
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
          >
            Удалить
          </Button>
        </div>
      )}
    </div>
  );
}
