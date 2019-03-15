import {sjServer} from '@/tools/servers'

/**
 * SJ api
 * Wed Jul 18 2018 15:15:47 GMT+0800 (CST)
 */
export default class SjApi {
  /**
   * 审计项目情况获取
   * string
   */
  static SJ0101A01(search = {}) {
    return sjServer.connection('GET', '/SJ0101/A01', search)
  }

  /**
   * 整改任务情况获取
   * string
   */
  static SJ0101A02(search = {}) {
    return sjServer.connection('GET', '/SJ0101/A02', search)
  }

  /**
   * 审计项目情况年份获取
   * string
   */
  static SJ0101A03(search = {}) {
    return sjServer.connection('GET', '/SJ0101/A03', search)
  }

  /**
   * 整改任务情况年份获取
   * string
   */
  static SJ0101A04(search = {}) {
    return sjServer.connection('GET', '/SJ0101/A04', search)
  }

  /**
   * 审计项目列表获取（分页&查询）
   * string
   */
  static SJ0201A01(search = {}) {
    return sjServer.connection('GET', '/SJ0201/A01', search)
  }

  /**
   * 审计项目新增提交
   * string
   */
  static SJ0201A02(data = {}) {
    return sjServer.connection('POST', '/SJ0201/A02', data)
  }

  /**
   * 审计项目编辑提交
   * string
   */
  static SJ0201A03(data = {}) {
    return sjServer.connection('POST', '/SJ0201/A03', data)
  }

  /**
   * 审计项目删除
   * string
   */
  static SJ0201A04(data = {}) {
    return sjServer.connection('POST', '/SJ0201/A04', data)
  }

  /**
   * 审计项目编辑数据获取
   * string
   */
  static SJ0201A05(search = {}) {
    return sjServer.connection('GET', '/SJ0201/A05', search)
  }

  /**
   * -
   * string
   */
  static SJ0201A06(search = {}) {
    return sjServer.connection('GET', '/SJ0201/A06', search)
  }

  /**
   * -
   * string
   */
  static SJ0201A07(search = {}) {
    return sjServer.connection('GET', '/SJ0201/A07', search)
  }

  /**
   * 整改任务列表获取（分页&查询）
   * string
   */
  static SJ0202A01(search = {}) {
    return sjServer.connection('GET', '/SJ0202/A01', search)
  }

  /**
   * 整改任务列表 统计数据获取
   * string
   */
  static SJ0202A02(search = {}) {
    return sjServer.connection('GET', '/SJ0202/A02', search)
  }

  /**
   * 整改任务新增提交
   * string
   */
  static SJ0301A01(data = {}) {
    return sjServer.connection('POST', '/SJ0301/A01', data)
  }

  /**
   * 整改任务编辑数据获取
   * string
   */
  static SJ0301A02(search = {}) {
    return sjServer.connection('GET', '/SJ0301/A02', search)
  }

  /**
   * 整改任务编辑提交
   * string
   */
  static SJ0301A03(data = {}) {
    return sjServer.connection('POST', '/SJ0301/A03', data)
  }

  /**
   * 整改任务删除
   * string
   */
  static SJ0301A04(data = {}) {
    return sjServer.connection('POST', '/SJ0301/A04', data)
  }

  /**
   * 整改任务列表获取（分页&查询）
   * string
   */
  static SJ0301A05(search = {}) {
    return sjServer.connection('GET', '/SJ0301/A05', search)
  }

  /**
   * -
   * string
   */
  static SJ0301A06(search = {}) {
    return sjServer.connection('GET', '/SJ0301/A06', search)
  }

  /**
   * 整改过程列表获取
   * string
   */
  static SJ0302A01(search = {}) {
    return sjServer.connection('GET', '/SJ0302/A01', search)
  }

  /**
   * 整改过程新增
   * string
   */
  static SJ0302A02(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A02', data)
  }

  /**
   * 整改过程编辑提交
   * string
   */
  static SJ0302A03(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A03', data)
  }

  /**
   * 整改过程删除
   * string
   */
  static SJ0302A04(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A04', data)
  }

  /**
   * 整改过程编辑数据获取
   * string
   */
  static SJ0302A05(search = {}) {
    return sjServer.connection('GET', '/SJ0302/A05', search)
  }

  /**
   * 整改结果列表获取
   * string
   */
  static SJ0302A06(search = {}) {
    return sjServer.connection('GET', '/SJ0302/A06', search)
  }

  /**
   * 整改结果新增提交
   * string
   */
  static SJ0302A07(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A07', data)
  }

  /**
   * 整改结果的编辑 和 审核共用一个接口
   * string
   */
  static SJ0302A08(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A08', data)
  }

  /**
   * 整改结果删除
   * string
   */
  static SJ0302A09(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A09', data)
  }

  /**
   * 整改结果编辑数据获取
   * string
   */
  static SJ0302A10(search = {}) {
    return sjServer.connection('GET', '/SJ0302/A10', search)
  }

  /**
   * 沟通记录列表获取
   * string
   */
  static SJ0302A11(search = {}) {
    return sjServer.connection('GET', '/SJ0302/A11', search)
  }

  /**
   * 沟通记录新增提交
   * string
   */
  static SJ0302A12(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A12', data)
  }

  /**
   * 整改结果评审
   * string
   */
  static SJ0302A14(data = {}) {
    return sjServer.connection('POST', '/SJ0302/A14', data)
  }

  /**
   * 监管单位列表获取
   * string
   */
  static SJ0401A01(search = {}) {
    return sjServer.connection('GET', '/SJ0401/A01', search)
  }

  /**
   * 监管单位删除
   * string
   */
  static SJ0401A02(data = {}) {
    return sjServer.connection('POST', '/SJ0401/A02', data)
  }

  /**
   * 监管单位新增
   * string
   */
  static SJ0401A03(data = {}) {
    return sjServer.connection('POST', '/SJ0401/A03', data)
  }

  /**
   * 监管单位编辑数据获取
   * string
   */
  static SJ0401A04(search = {}) {
    return sjServer.connection('GET', '/SJ0401/A04', search)
  }

  /**
   * 监管单位编辑提交
   * string
   */
  static SJ0401A05(data = {}) {
    return sjServer.connection('POST', '/SJ0401/A05', data)
  }

  /**
   * 监管类别列表获取
   * string
   */
  static SJ0501A01(search = {}) {
    return sjServer.connection('GET', '/SJ0501/A01', search)
  }

  /**
   * 监管类别删除
   * string
   */
  static SJ0501A02(data = {}) {
    return sjServer.connection('POST', '/SJ0501/A02', data)
  }

  /**
   * 监管类别新增
   * string
   */
  static SJ0501A03(data = {}) {
    return sjServer.connection('POST', '/SJ0501/A03', data)
  }

  /**
   * 监管类别编辑数据获取
   * string
   */
  static SJ0501A04(search = {}) {
    return sjServer.connection('GET', '/SJ0501/A04', search)
  }

  /**
   * 监管类别编辑提交
   * string
   */
  static SJ0501A05(data = {}) {
    return sjServer.connection('POST', '/SJ0501/A05', data)
  }

  /**
   * 被审计对象列表获取
   * string
   */
  static SJ0601A01(search = {}) {
    return sjServer.connection('GET', '/SJ0601/A01', search)
  }

  /**
   * 被审计对象删除
   * string
   */
  static SJ0601A02(data = {}) {
    return sjServer.connection('POST', '/SJ0601/A02', data)
  }

  /**
   * 被审计对象新增
   * string
   */
  static SJ0601A03(data = {}) {
    return sjServer.connection('POST', '/SJ0601/A03', data)
  }

  /**
   * 被审计对象编辑数据获取
   * string
   */
  static SJ0601A04(search = {}) {
    return sjServer.connection('GET', '/SJ0601/A04', search)
  }

  /**
   * 被审计对象编辑提交
   * string
   */
  static SJ0601A05(data = {}) {
    return sjServer.connection('POST', '/SJ0601/A05', data)
  }

  /**
   * 问题类别列表获取
   * string
   */
  static SJ0701A01(search = {}) {
    return sjServer.connection('GET', '/SJ0701/A01', search)
  }

  /**
   * 问题类别删除
   * string
   */
  static SJ0701A02(data = {}) {
    return sjServer.connection('POST', '/SJ0701/A02', data)
  }

  /**
   * 问题类别新增
   * string
   */
  static SJ0701A03(data = {}) {
    return sjServer.connection('POST', '/SJ0701/A03', data)
  }

  /**
   * 问题类别编辑数据获取
   * string
   */
  static SJ0701A04(search = {}) {
    return sjServer.connection('GET', '/SJ0701/A04', search)
  }

  /**
   * 问题类别编辑提交
   * string
   */
  static SJ0701A05(data = {}) {
    return sjServer.connection('POST', '/SJ0701/A05', data)
  }

}
