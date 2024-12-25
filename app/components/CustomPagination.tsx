import { Pagination } from 'antd'

interface CustomPaginationProps {
  current: number
  total: number
  onChange: (page: number) => void
  disabled?: boolean
}

export function CustomPagination({ current, total, onChange, disabled }: CustomPaginationProps) {
  return (
    <Pagination
      current={current}
      total={total}
      onChange={onChange}
      disabled={disabled}
      pageSize={1}
      showSizeChanger={false}
      className="[&_.ant-pagination-item_a]:!text-white [&_.ant-pagination-prev]:!border-zinc-700 [&_.ant-pagination-next]:!border-zinc-700 [&_.ant-pagination-item]:!bg-zinc-800 [&_.ant-pagination-item]:!border-zinc-700 [&_.ant-pagination-item-active]:!bg-red-600 [&_.ant-pagination-item-active]:!border-red-600 [&_.ant-pagination-item:hover]:!border-red-600 [&_.ant-pagination-prev_.ant-pagination-item-link]:!bg-zinc-800 [&_.ant-pagination-next_.ant-pagination-item-link]:!bg-zinc-800 [&_.ant-pagination-prev_.ant-pagination-item-link]:!border-zinc-700 [&_.ant-pagination-next_.ant-pagination-item-link]:!border-zinc-700 [&_.ant-pagination-prev_.ant-pagination-item-link]:!text-white [&_.ant-pagination-next_.ant-pagination-item-link]:!text-white hover:[&_.ant-pagination-prev_.ant-pagination-item-link]:!border-red-600 hover:[&_.ant-pagination-next_.ant-pagination-item-link]:!border-red-600 disabled:[&_.ant-pagination-item-link]:!bg-zinc-800/50 disabled:[&_.ant-pagination-item-link]:!border-zinc-700/50 disabled:[&_.ant-pagination-item-link]:!text-gray-500"
    />
  )
} 