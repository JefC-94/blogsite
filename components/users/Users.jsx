import React from 'react';
import Link from 'next/link';
import styles from '../../styles/user.module.scss';

function Users({sortedUsers}) {
    return (
        <div className={styles.tableWrap}>
          <table className={styles.userTable}>
          <thead>
              <tr>
                <th><span>Username</span></th>
                <th><span>Password</span></th>
                <th>Actions</th>
              </tr>
          </thead>
          <tbody>
          {sortedUsers && sortedUsers.map(user => (
            <tr key={user.id}>
              <td><Link href={`/user/${user.id}/view`}><a className="link black">{user.username}</a></Link></td>
              <td><span>{user.password}</span></td>
              <td className={styles.flexCell}>
                <Link href={`/user/${user.id}/update`}>
                  <a className="button">Update</a>
                </Link>
              </td>
            </tr>
          )
          )}
          </tbody>
          </table>
        </div>
    )
}

export default Users
